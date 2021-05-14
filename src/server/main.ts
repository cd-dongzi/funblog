import Koa from 'koa'
import https from 'https'
import http from 'http'
import ip from 'ip'
import chalk from 'chalk'
import sourceMapSupport from 'source-map-support'
import serverConfig from '@server/config'
import rootConfig from '@root/src/shared/config'
import middleware from './middleware/useMiddleware'
import router from './router'
import SSR from './ssr'
import { start } from './database'
import timer from './timer'
// node错误开始sourcemap追踪
sourceMapSupport.install()
const app = new Koa()

// 中间件
middleware(app)

// 路由
router(app)

// 定时器
timer()
const printServer = (protocol: string, port: number) => {
  const ServerLocalAddress = `${protocol}://localhost:${port}/`
  const ServerNetworkAddress = `${protocol}://${ip.address()}:${port}/`
  console.log(
    `\nServer running at:
- Local:   ${chalk.cyan(ServerLocalAddress)}
- Network: ${chalk.cyan(ServerNetworkAddress)}`
  )
}

Promise.all([start(), SSR(app)])
  .then(() => {
    if (rootConfig.isHttps) {
      https.createServer(serverConfig.httpsOptions, app.callback()).listen(rootConfig.app.server.httpsPort, '0.0.0.0', () => {
        printServer('https', rootConfig.app.server.httpsPort)
      })
    } else {
      http.createServer(app.callback()).listen(rootConfig.app.server.httpPort, '0.0.0.0', () => {
        printServer('http', rootConfig.app.server.httpPort)
      })
    }
  })
  .catch((err) => {
    process.exit()
  })
