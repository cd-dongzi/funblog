import path from 'path'
import fs from 'fs'
import portfinder from 'portfinder'
import config from './config'

const realpath = fs.realpathSync(process.cwd())
const resolve = (dir: string) => path.join(realpath, dir)
const assetsPath = (_path: string) => path.posix.join(config.current.assetsSubDirectory, _path)

// 检测端口(避免端口占用错误出现)
const detectionPort = (PORT: number) => {
  return new Promise((resolve, reject) => {
    portfinder.basePort = PORT
    portfinder
      .getPortPromise()
      .then((port: number) => {
        resolve(port)
      })
      .catch((err: Error) => {
        reject(err)
      })
  })
}

export default {
  realpath,
  resolve,
  assetsPath,
  detectionPort
}
