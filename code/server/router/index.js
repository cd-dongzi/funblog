import koaRouter from 'koa-router'
const router = koaRouter()
import send from 'koa-send'
import path from 'path'

export default app => {
  // api
  let apiRouter = require('./routes/api').default
  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

  // 静态文件访问
  let adminRouter = require('./routes/admin').default,
    clientRouter = require('./routes/client').default
  router.use('', adminRouter.routes(), clientRouter.routes(), adminRouter.allowedMethods())

  app.use(router.routes()).use(router.allowedMethods())
}