import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import staticFiles from 'koa-static'
import compress from 'koa-compress'
import koaLogger from 'koa-logger'
import paths from '@root/build/paths'
import utils from '@root/build/utils'
import serverConfig from '@server/config'
import rootConfig from '@root/src/shared/config'
import sendMiddleware from './send'
import conditionalMiddleware from './conditional'
import etagMiddleware from './etag'
import { loggerMiddleware } from './logger'

export default (app: Koa) => {
  app.use(async (ctx, next) => {
    if (ctx.url === '/favicon.ico') {
      return
    }
    await next()
  })
  app.use(async (ctx, next) => {
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200
    } else {
      await next()
    }
  })

  // 协商缓存
  app.use(conditionalMiddleware())
  app.use(etagMiddleware())

  // 压缩
  app.use(
    compress({
      threshold: 2048
    })
  )

  // 日志
  app.use(loggerMiddleware())

  app.use(koaLogger())

  // post请求中间件
  app.use(
    bodyParser({
      formLimit: '1mb'
    })
  )

  // 数据返回的封装
  app.use(sendMiddleware())

  // 静态文件中间件
  app.use(staticFiles(paths.buildClientPath, rootConfig.staticFilesOptions))
  if (rootConfig.isTest) {
    app.use(staticFiles(paths.buildPath, rootConfig.staticFilesOptions))
  }
  app.use(staticFiles(utils.resolve('private'), rootConfig.staticFilesOptions))
  app.use(staticFiles(utils.resolve(serverConfig.staticDir), rootConfig.staticFilesOptions))
}
