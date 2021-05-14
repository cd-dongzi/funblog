import Koa from 'koa'
import chalk from 'chalk'
import http from 'http'
import https from 'https'
import rimraf from 'rimraf'
import dayjs from 'dayjs'
import open from 'open'
import bodyParser from 'koa-bodyparser'
import webpack, { Compiler } from 'webpack'
import serverConfig from '@server/config'
import rootConfig from '@root/src/shared/config'
import paths from '@root/build/paths'
import { Configuration } from '@root/build/webpack'
import webpackDevMiddleware from './plugins/webpack-dev'
import webpackHotMiddleware from './plugins/webpack-hot'

export const logMsg = (message: string, level = 'info', hasTime?: boolean) => {
  const color = level === 'info' ? 'cyan' : level === 'warning' ? 'yellow' : level === 'error' ? 'red' : 'white'
  console.log(`${hasTime ? `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ` : ''}${chalk[color](message)}`)
}

export const setCompilerTip = (compiler: webpack.Compiler, name: string) => {
  compiler.hooks.watchRun.tap(name, () => {
    logMsg(`[${name}] Compiling`)
  })
  compiler.hooks.done.tap(name, (stats) => {
    if (!stats.hasErrors()) {
      logMsg(`[${name}] Done!`)
    }
  })
}

export const openBrowser = (() => {
  let o: any
  return async (url: string) => {
    if (o) return
    logMsg('Opening browser...')
    o = await open(url)
    logMsg('The browser opens successfully!')
  }
})()

// 生成服务
// export const createService = ({
//   webpackConfig,
//   compiler,
//   port,
//   cb,
//   middleware
// }: {
//   webpackConfig: Configuration
//   compiler: Compiler
//   port: number
//   cb?: () => void
//   middleware?: (app: Koa) => void
// }) => {
//   const app = new Koa()
//   app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*')
//     await next()
//   })
//   const dev = webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath as string,
//     stats: webpackConfig.stats
//   })
//   app.use(dev)

//   app.use(webpackHotMiddleware(compiler))
//   if (middleware) {
//     middleware(app)
//   }
//   app.use(
//     bodyParser({
//       enableTypes: ['json', 'form', 'text']
//     })
//   )

//   if (rootConfig.isHttps) {
//     https.createServer(serverConfig.httpsOptions, app.callback()).listen(port, cb)
//   } else {
//     http.createServer(app.callback()).listen(port, cb)
//   }
//   return app
// }

// // 移除构建好的旧文件
// export const removeBuildDir = () => {
//   if (process.env.BUILD_ENV === 'admin') {
//     rimraf.sync(paths.buildAdminPath)
//   } else if (process.env.BUILD_ENV === 'client') {
//     rimraf.sync(paths.buildClientPath)
//   } else if (process.env.BUILD_ENV === 'server') {
//     rimraf.sync(paths.buildServerPath)
//   } else {
//     rimraf.sync(paths.buildAdminPath)
//     rimraf.sync(paths.buildClientPath)
//     rimraf.sync(paths.buildServerPath)
//   }
// }
