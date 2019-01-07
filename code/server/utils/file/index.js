import path from 'path'
import fs from 'fs'
import URL from 'url'
import Busboy from 'busboy'
import unzip from 'unzip2'
import archiver from 'archiver'
import {put, putStream} from '../oss/ali-oss'

const NODE_ENV = process.env.NODE_ENV

//检测文件并创建文件
const mkdirSync = dirname => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

//重命名
function rename(fileName) {
    let arr = fileName.split('.')
    let prefix = arr[0],
        suffix = arr[1]
    return `${prefix}-${Math.random().toString(16).substr(2)}.${suffix}`
}

export default class File {
    /**
     *删除目录文件
     * @static
     * @param {*} dirPath
     * @memberof File
     */
    static deleteDir (dirPath) {
        let files = fs.readdirSync(dirPath)
        files.forEach(file => {
            const currentPath = `${dirPath}/${file}`
            //遇到文件夹 递归删除
            if(fs.statSync(currentPath).isDirectory()) {
                this.deleteDir(currentPath)
            }else{
                fs.unlinkSync(currentPath)
            }
        })
        // rmdirSync  只能删空目录
        fs.rmdirSync(dirPath)
    }

    /**
     *上传文件
     *
     * @static
     * @param {*} ctx
     * @param {*} opts
     * @returns
     * @memberof File
     */
    static uploadFile(ctx, opts) {


        const busboy = new Busboy({
            headers: ctx.req.headers
        })
        console.log('start uploading...')
        /*
            filename: 字段名，
            file: 文件流,
            filename: 文件名
        */
        return new Promise((resolve, reject) => {
            const fileObj = {}
            const promiseAll = []
            busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
                console.log('File [' + fieldname + ']: filename: ' + filename)
                const {
                    filePath,
                    dir,
                    type
                } = opts
                const fileType = mimetype.split('/')[0]
                let fullDirPath,
                    prefix,
                    dirPath

                filename = rename(filename)
                // 以时间命名文件夹
                if (type === 'date') {
                    const d = new Date()
                    const year = d.getFullYear() + '',
                        month = d.getMonth() + 1 + ''
                    fullDirPath = path.join(filePath, dir, year, month)
                    dirPath = `/${dir}/${year}/${month}/${filename}`
                    prefix = `${ctx.protocol}://${ctx.host}${dirPath}`
                } else { // 以类型命名文件夹 
                    fullDirPath = path.join(filePath, dir, fileType)
                    dirPath = `/${dir}/${fileType}/${filename}`
                    prefix = `${ctx.protocol}://${ctx.host}${dirPath}`
                }
                if (!mkdirSync(fullDirPath)) {
                    reject('没找到目录')
                    throw new Error('没找到目录')
                }
                const fullFilPath = path.join(fullDirPath, filename)
                file.pipe(fs.createWriteStream(fullFilPath))

                file.on('end', async () => {
                    promiseAll.push({
                        name: `ali_${fieldname}`,
                        promise: put(NODE_ENV+dirPath, path.join($publicPath, dirPath))
                    })
                    console.log('File [' + fieldname + '] Finished')
                    fileObj[fieldname] = prefix
                })
            })

            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
                console.log(fieldname, val)
                fileObj[fieldname] = val
            })
            busboy.on('finish', async () => {
                console.log('finished...')
                // 上传阿里云
                if (promiseAll.length > 0) {
                    let promises = [], promiseNames = []
                    promiseAll.forEach(item => {
                        promises.push(item.promise)
                        promiseNames.push(item.name)
                    })
                    // 获取url赋值
                    const urls = await Promise.all(promises)
                    urls.forEach((url, index) => {
                        fileObj[promiseNames[index]] = url
                    })
                }
                resolve(fileObj)
            })
            busboy.on('error', function (err) {
                console.log('err:' + err)
                reject(err)
            })
            ctx.req.pipe(busboy)
        })
    }

    /**
     *上传文件夹
     *
     * @static
     * @param {*} ctx
     * @param {*} opts
     * @memberof File
     */
    static uploadFolder(ctx, opts) {
        const busboy = new Busboy({
            headers: ctx.req.headers
        })
        console.log('start uploading...')
        /*
            filename: 字段名，
            file: 文件流,
            filename: 文件名
        */
        return new Promise((resolve, reject) => {
            const fileObj = {}
            busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
                console.log('File [' + fieldname + ']: filename: ' + filename)
                const {
                    filePath,
                    dir,
                    type
                } = opts
                const fileDirName = filename.split('.')[0]
                let fullDirPath,
                    prefix

                // 以时间命名文件夹
                if (type === 'date') {
                    const d = new Date()
                    const year = d.getFullYear() + '',
                        month = d.getMonth() + 1 + ''
                    fullDirPath = path.join(filePath, dir, year, month)
                    prefix = `${ctx.protocol}://${ctx.host}/${dir}/${year}/${month}/${fileDirName}/index.html`
                } else { // 以类型命名文件夹 
                    fullDirPath = path.join(filePath, dir)
                    prefix = `${ctx.protocol}://${ctx.host}/${dir}/${fileDirName}/index.html`
                }

                const fullFilPath = path.join(fullDirPath, fileDirName)
                if (fs.existsSync(fullFilPath)) {
                    return reject('文件夹已经存在')
                }
                file.pipe(unzip.Extract({
                    path: fullDirPath
                }))

                file.on('end', () => {
                    console.log('File [' + fieldname + '] Finished')
                    fileObj[fieldname] = prefix
                })
            })

            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
                console.log(fieldname, val)
                fileObj[fieldname] = val
            })
            busboy.on('finish', async () => {
                console.log('finished...')
                resolve(fileObj)
            })
            busboy.on('error', function (err) {
                console.log('err:' + err)
                reject(err)
            })
            ctx.req.pipe(busboy)
        })
    }

    /**
     *删除文件
     * @static
     * @param {*} Path
     * @returns
     * @memberof File
     */
    static deleteFile (Path) {
        console.log('删除文件')
        return new Promise((resolve, reject) => {
            const filePath = URL.parse(Path).path
            const fullPath = decodeURI(path.posix.join($publicPath, filePath))
            console.log('需要删除的路径:' + fullPath)
            if (fs.existsSync(fullPath)) {
                try {
                    fs.unlinkSync(fullPath)
                    resolve('删除成功')
                    console.log('删除成功')
                }catch(err) {
                    reject(err)
                }
            }else{
                reject('文件不存在')
            }
        })
    }

    /**
     *删除文件夹
     * @static
     * @param {*} Path
     * @returns
     * @memberof File
     */
    static deleteFolder (Path) {
        console.log('删除目录')
        return new Promise((resolve, reject) => {
            const filePath = URL.parse(Path).path
            const fullPath = path.posix.join($publicPath, filePath)
            const dir = path.dirname(fullPath)
            if (fs.existsSync(dir)) {
                this.deleteDir(dir)
                resolve('删除成功') 
                console.log('删除成功') 
            }else{
                reject('目录不存在')
            }
        })
    }

    /**
     *压缩成文件至zip格式
     * @static
     * @param {*} ctx
     * @param {*} opts
     * @memberof File
     */
    static compressZip(dirPath) {
        return new Promise((resolve, reject) => {
            // 文件目录
            const fileDir = `${$publicPath}${dirPath}`
            // zip文件目录
            const zipDir = `${$publicPath}/zip${dirPath}`
            // zip文件路径
            const zipPath = `${zipDir}.zip`
            
            const returnPath = `/public/zip${dirPath}.zip`
            // 存在zip文件
            if (fs.existsSync(zipPath)) {
                console.log('存在')
                return resolve(returnPath)
            }
            // 创建目录
            // 不需要创建最后的目录
            mkdirSync(zipDir.split('/').slice(0, -1).join('/'))

            const output = fs.createWriteStream(zipPath)

            // 成功
            output.on('close', () => {
                console.log(archive.pointer() + ' total bytes')
                console.log('archiver has been finalized and the output file descriptor has closed.')
                resolve(returnPath)
            })
            output.on('end', () => {
                console.log('Data has been drained')
                reject()
            })


            const archive = archiver('zip', {
                // Sets the compression level.
                zlib: {
                    level: 9
                }
            })
            archive.on('warning', (err) => {
                console.log('warning')
                console.log(err)
                if (err.code === 'ENOENT') {
                    reject(err)
                } else {
                    reject(err)
                    throw err
                }
            })
            archive.on('error', (err) => {
                console.log('error')
                console.log(err)
                reject(err)
                throw err
            })
            archive.pipe(output)
            // 需要生成的文件目录， 和名字
            const zipDirname = fileDir.split('/')[fileDir.split('/').length-1]
            archive.directory(fileDir, zipDirname)
            archive.finalize()
        })
    }
}
