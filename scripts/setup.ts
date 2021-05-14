import webpack from 'webpack'
import Koa from 'koa'
import getConfig from '@root/build/webpack'
import path from 'path'
import MFS from 'memory-fs'
import webpackDevMiddleware from './plugins/webpack-dev'
import webpackHotMiddleware from './plugins/webpack-hot'
import { DEFAULT_FILENAME } from '@root/build/plugins/react-ssr-server'
import { setCompilerTip, logMsg } from './utils'

type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U
interface MFSCompiler extends Overwrite<webpack.Compiler, { outputFileSystem: MFS }> {
  outputFileSystem: MFS
}

const [clientWebpackConfig, serverWebpackConfig] = getConfig(process.env.NODE_ENV as ENV)

let clientCompiler: webpack.Compiler
const getLoadableStats = () => {
  return new Promise<AnyObject>((resolve, reject) => {
    try {
      const res = (clientCompiler as MFSCompiler).outputFileSystem.readFileSync(path.join(clientCompiler.outputPath, 'loadable-stats.json'))
      const data = JSON.parse(res?.toString() as string)
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}
const startClient = (app: Koa, cb: ({ stats, fileSystem }: { stats: any; fileSystem: MFS }) => void) => {
  return new Promise<void>((resolve, reject) => {
    clientWebpackConfig.entry.main = [`webpack-hot-middleware/client?path=/__webpack_hmr`, clientWebpackConfig.entry.main]
    clientCompiler = webpack(clientWebpackConfig)
    const dev = webpackDevMiddleware(clientCompiler, {
      publicPath: clientWebpackConfig.output.publicPath as string,
      stats: false
    })
    const name = `${clientWebpackConfig.name}`
    setCompilerTip(clientCompiler, name)
    clientCompiler.hooks.done.tap(name, (stats) => {
      if (stats.hasErrors()) {
        return reject(stats.toJson().errors)
      }
      const outputFileSystem = (clientCompiler as MFSCompiler).outputFileSystem
      const res = outputFileSystem.readFileSync(path.join(clientCompiler.outputPath, 'loadable-stats.json'))
      const loadableStats = JSON.parse(res)
      cb({ stats: loadableStats, fileSystem: outputFileSystem })
      resolve()
    })
    app.use(dev)
    app.use(webpackHotMiddleware(clientCompiler))
  })
}

const startServer = (cb: (manifest: any) => void) => {
  return new Promise<void>((resolve, reject) => {
    const serverCompiler = webpack(serverWebpackConfig) as MFSCompiler
    serverCompiler.outputFileSystem = new MFS()
    const name = `${serverWebpackConfig.name}`
    setCompilerTip(serverCompiler as webpack.Compiler, name)
    serverCompiler.watch(
      {
        ignored: /node_modules/
      },
      (err, stats) => {
        if (err) {
          throw err
        }
        if (!stats) return
        if (stats.hasErrors()) {
          const info = stats.toJson()
          info.errors?.forEach((error) => {
            logMsg(error.message, 'error')
          })
          return
        }
        if (!err && !stats.hasErrors()) {
          const data = serverCompiler.outputFileSystem.readFileSync(path.join(serverWebpackConfig.output.path, DEFAULT_FILENAME))
          require('fs').writeFileSync(path.resolve(__dirname, './test.json'), data)
          cb(JSON.parse(data))
          resolve()
        } else {
          reject()
        }
      }
    )
  })
}

// 构建
const start = async (app: Koa, cb: (opts: { loadableStats: any; serverManifest: any; inputFileSystem: MFS }) => void) => {
  let loadableStats: any, serverManifest: any, inputFileSystem: MFS
  const update = () => {
    if (loadableStats && serverManifest && inputFileSystem) {
      cb({
        loadableStats,
        serverManifest,
        inputFileSystem
      })
    }
  }
  await Promise.all([
    startClient(app, ({ stats, fileSystem }) => {
      loadableStats = stats
      inputFileSystem = fileSystem
      update()
    }),
    startServer((manifest) => {
      serverManifest = manifest
      update()
    })
  ])
  return
}

export { start, getLoadableStats }
