import { Context } from 'koa'
import Busboy from 'busboy'
import fs from 'fs'
import path from 'path'
import url from 'url'
import archiver from 'archiver'
import oss from '@server/utils/oss'
import rootConfig from '@root/src/shared/config'
import serverConfig from '@server/config'
import Utils from '@root/build/utils'

//检测文件并创建文件
const mkdirSync = (dirname: string) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
// 重命名
function rename(fileName: string, hasPrefix = false) {
  const arr = fileName.split('.')
  const prefix = arr[0],
    suffix = arr[1]
  return `${hasPrefix ? `${prefix}-` : ''}${Math.random().toString(16).substr(2)}.${suffix}`
}
// 设值
function setVal(fieldname: string, val: any, formObj: AnyObject) {
  const index = fieldname.lastIndexOf('[]')
  const hasArray = index >= 0
  // 列表上传
  if (hasArray) {
    formObj[fieldname.slice(0, index)] = [...(formObj[fieldname.slice(0, index)] || []), val]
  } else {
    formObj[fieldname] = val
  }
}

type Options = {
  oss?: boolean // 是否上传oss
  rename?: boolean // 是否重命名
  fileDir?: string // 文件写入目录
  overlay?: boolean // 文件是否可覆盖
}
class File {
  static defaultOptions = {
    oss: false,
    rename: true,
    fileDir: '',
    overlay: false
  }
  // 检查文件是否存在
  static exists(filepath: string) {
    try {
      fs.accessSync(filepath)
      return true
    } catch (e) {
      return false
    }
  }

  // 上传文件
  static uploadFile<T extends AnyObject>(ctx: Context, options: Options | Record<string, Options> = File.defaultOptions) {
    const busboy = new Busboy({
      headers: ctx.req.headers
    })
    console.log('start uploading...')
    return new Promise<T>((resolve, reject) => {
      const formObj: AnyObject = {}
      const promiseFiles: Promise<any>[] = []
      busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        console.log('File [' + fieldname + ']: filename: ' + filename)
        let onResolve: (value?: any) => void = () => null,
          onReject: (err: any) => void = () => null
        const readyPromise = new Promise((rs, re) => {
          onResolve = rs
          onReject = re
        })
        promiseFiles.push(readyPromise)

        // 获取上传配置options
        const realFieldname = fieldname.endsWith('[]') ? fieldname.slice(0, -2) : fieldname
        let opts = (options as Record<string, Options>)[realFieldname] || options
        opts = {
          ...File.defaultOptions,
          ...opts
        }

        const name = opts.rename ? rename(filename) : filename.split(rootConfig.fileSeparation).join('/')
        const filePath = `${opts.fileDir}${name}`
        // 上传oss
        if (opts.oss) {
          try {
            const url = await oss.putStream(filePath, file)
            setVal(fieldname, url, formObj)
            onResolve()
          } catch (e) {
            onReject(e)
          }
        } else {
          // 上传自己服务器
          const dir = Utils.resolve(`/${serverConfig.staticDir}/${opts.fileDir}`)
          const fullFilPath = path.join(dir, name)

          // 上传文件夹的时候，需要检测name中的文件目录并创建
          const arr = fullFilPath.split('/')
          const nDir = arr.slice(0, arr.length - 1).join('/')
          if (!mkdirSync(nDir)) {
            return reject('没找到目录')
          }

          if (!opts.overlay && File.exists(fullFilPath)) {
            return reject('文件已经存在了')
          }

          file.pipe(fs.createWriteStream(fullFilPath))
          file.on('end', async () => {
            setVal(fieldname, `${ctx.protocol}://${ctx.host}/${opts.fileDir}${name}`, formObj)
            onResolve()
          })
          file.on('error', (e) => {
            onReject(e)
          })
        }
      })

      busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        setVal(fieldname, JSON.parse(val), formObj)
      })
      busboy.on('finish', async () => {
        try {
          if (promiseFiles.length > 0) {
            await Promise.all(promiseFiles)
          }
          console.log('finished...')
          resolve(formObj as T)
        } catch (e) {
          reject(e)
        }
      })
      busboy.on('error', (err: Error) => {
        reject(err)
      })
      ctx.req.pipe(busboy)
    })
  }

  // 压缩文件成ZIP
  static compressZip({ files, zipDir, fileDir }: { files: string[]; zipDir: string; fileDir: string }) {
    return new Promise<string>((resolve, reject) => {
      if (files.length === 0) {
        return reject('不存在文件')
      }
      files = files.map((file) => {
        const str = decodeURI(new url.URL(file).pathname)
        const prefix = `/${fileDir}/`
        return str.slice(str.indexOf(prefix) + prefix.length)
      })
      const dir = files[0].split('/')[0]
      const outputPath = Utils.resolve(`${serverConfig.staticDir}/${zipDir}`)
      if (!mkdirSync(outputPath)) {
        return reject('没找到目录')
      }
      const output = fs.createWriteStream(`${outputPath}/${dir}.zip`)
      output.on('close', () => {
        console.log(archive.pointer() + ' total bytes')
        console.log('archiver has been finalized and the output file descriptor has closed.')
        resolve(`/${serverConfig.staticDir}/${zipDir}/${dir}.zip`)
      })
      output.on('end', () => {
        console.log('Data has been drained')
        reject()
      })
      const archive = archiver('zip', {
        zlib: { level: 9 }
      })
      for (const file of files) {
        archive.append(fs.createReadStream(Utils.resolve(`${serverConfig.staticDir}/${fileDir}/${file}`)), { name: file })
      }
      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          // log warning
          console.warn(err)
        } else {
          reject(err)
        }
      })
      archive.on('error', (err) => {
        reject(err)
      })
      archive.pipe(output)
      archive.finalize()
    })
  }
}

export default File
