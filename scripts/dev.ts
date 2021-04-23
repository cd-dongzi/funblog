import webpack from 'webpack'
import getConfig from '@root/build/webpack'
import nodemon from 'nodemon'
import path from 'path'
import rootConfig from '@root/src/shared/config'
import { createProxyMiddleware } from 'http-proxy-middleware'
import openBrowser from './plugins/open-browser'
import { setCompilerTip, logMsg, createService } from './utils'
import config from './config'

const { __WEBPACK_HOST__, __WEBPACK_PORT__ } = config
const WEBPACK_URL = `${__WEBPACK_HOST__}:${__WEBPACK_PORT__}`

const [clientWebpackConfig, serverWebpackConfig, adminWebpackConfig] = getConfig(process.env.NODE_ENV as ENV)

const closeCompiler = (compiler: webpack.Compiler) => {
  compiler.close((err) => {
    if (err) {
      throw err
    }
  })
}

// 构建后台管理端界面
const startAdmin = async () => {
  adminWebpackConfig.entry.main = [`webpack-hot-middleware/client?path=/__webpack_hmr`, adminWebpackConfig.entry.main]
  const compiler = webpack(adminWebpackConfig)
  const compilerPromise = setCompilerTip(compiler, adminWebpackConfig.name)
  createService({
    webpackConfig: adminWebpackConfig,
    compiler,
    port: config.__WEBPACK_ADMIN_PORT__,
    middleware: (app) => {
      app.use(async (ctx, next) => {
        if (ctx.url.startsWith('/admin_api')) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const k2c = require('koa2-connect')
          ctx.respond = false
          return await k2c(
            createProxyMiddleware({
              target: `${rootConfig.app.server.protocol}://${rootConfig.app.server.host}:${rootConfig.app.server.port}`,
              changeOrigin: true,
              // https 不检验证书
              secure: false,
              pathRewrite: {
                '^/admin_api': '/api/admin'
              },
              onError: (err) => {
                console.log('onError', err.message)
              }
            })
          )(ctx, next)
        }
        await next()
      })
    }
  })
  try {
    await compilerPromise
    closeCompiler(compiler)
  } catch (err) {
    logMsg(err, 'error')
  } finally {
    return
  }
}

// 构建client 跟 server
const start = async () => {
  const startTime = new Date().getTime()
  clientWebpackConfig.output.publicPath = serverWebpackConfig.output.publicPath = `${WEBPACK_URL}${clientWebpackConfig.output.publicPath}`
  clientWebpackConfig.entry.main = [`webpack-hot-middleware/client?path=${WEBPACK_URL}/__webpack_hmr`, clientWebpackConfig.entry.main]
  const multiCompiler = webpack([clientWebpackConfig, serverWebpackConfig])
  const compilers = multiCompiler.compilers
  const clientCompiler = compilers.find((compiler) => compiler.name === 'client') as webpack.Compiler
  const serverCompiler = compilers.find((compiler) => compiler.name === 'server') as webpack.Compiler

  const clientCompilerPromise = setCompilerTip(clientCompiler, clientWebpackConfig.name)
  const serverCompilerPromise = setCompilerTip(serverCompiler, serverWebpackConfig.name)

  createService({
    webpackConfig: clientWebpackConfig,
    compiler: clientCompiler,
    port: __WEBPACK_PORT__
  })
  let script: any = null
  // 重启
  const nodemonRestart = () => {
    if (script) {
      script.restart()
    }
  }

  serverCompiler.watch(
    {
      ignored: /node_modules/
    },
    (err, stats) => {
      nodemonRestart()
      if (err) {
        throw err
      }
      if (!stats) return
      if (!err && !stats.hasErrors()) {
        return console.log(stats.toString(serverWebpackConfig.stats))
      }
      if (stats.hasErrors()) {
        const info = stats.toJson()
        info.errors?.forEach((error) => {
          logMsg(error.message, 'error')
        })
      }
    }
  )

  try {
    await clientCompilerPromise
    await serverCompilerPromise
    await startAdmin()

    closeCompiler(clientCompiler)
    closeCompiler(serverCompiler)
    logMsg(`Build time ${new Date().getTime() - startTime}`)
  } catch (err) {
    logMsg(err, 'error')
  }

  script = nodemon({
    script: path.join(serverWebpackConfig.output.path, 'entry.js')
  })

  let startCount = 0
  script.on('start', () => {
    logMsg('Server has started.')
    if (config.openBrowser && !startCount) {
      openBrowser(`http://${rootConfig.app.server.host}:${rootConfig.app.server.httpsPort}/`)
      startCount++
    }
  })

  script.on('restart', () => {
    logMsg('Server side app has been restarted.', 'warning')
  })

  script.on('quit', () => {
    console.log('Process ended')
    process.exit()
  })

  script.on('error', () => {
    logMsg('An error occured. Exiting', 'error')
    process.exit(1)
  })
}
start()
