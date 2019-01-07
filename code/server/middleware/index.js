import path from 'path'
import bodyParser from 'koa-bodyparser'
import staticFiles from 'koa-static'
import compress from 'koa-compress'
import Log from './log'
import Send from './send'
import Rule from './rule'
export default app => {
  app.use(async (ctx, next) => {
    if (ctx.url == '/favicon.ico') return
    await next()
    if (ctx.origin === 'http://www.dzblog.cn') {
      ctx.status = 301
      return ctx.redirect(`http://dzblog.cn${ctx.url}`)
    }

    ctx.status = 200
    ctx.set('Cache-Control', 'must-revalidation')
    // ctx.set('Access-Control-Allow-Origin', ctx.origin)

    if (ctx.fresh) {
      ctx.status = 304
      return
    }
  })

  //gzip压缩
  app.use(compress())

  //post请求中间件
  app.use(bodyParser({
    formLimit: '1mb'
  }))

  //静态文件中间件
  app.use(staticFiles(path.resolve(__dirname, '../../../public')))

  // 日志打印
  app.use(Log())

  // 数据返回的封装
  app.use(Send())

  // 规则中间件
  // 挂载js文件方法于app上， 可以直接通过app访问
  Rule({
    app,
    rules: [{
      path: path.join(__dirname, '../controller'),
      name: 'controller'
    }]
  })
}