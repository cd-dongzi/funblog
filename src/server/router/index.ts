import Koa, { DefaultState, Context } from 'koa'
import KoaRouter from 'koa-router'
import { bootstrapControllers } from '@server/controllers'
import { routerErrorMiddleware, loggerApiMiddleware } from '@server/middleware'
import page from './routes/page'
import updateOldData from './updateOldData'

const router = new KoaRouter<DefaultState, Context>()

export default (app: Koa) => {
  router.get('/test', async (ctx, next) => {
    ctx.send('test')
  })
  // page页面
  router.use(page.routes())

  updateOldData(router)

  bootstrapControllers({
    router,
    basePath: '/api',
    controllerPaths: ['controllers/api/*/**/*.ts'],
    middlewares: [routerErrorMiddleware(), loggerApiMiddleware()]
  })
  app.use(router.routes()).use(router.allowedMethods())
  // api 404
  app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/api')) {
      return ctx.sendCodeError(404)
    }
    await next()
  })
}
