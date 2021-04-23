import Koa, { Next } from 'koa'

// 协商缓存
const conditionalMiddleware = () => {
  return async (ctx: Koa.Context, next: Next) => {
    await next()
    if (ctx.fresh) {
      ctx.status = 304
      ctx.body = null
    }
  }
}
export default conditionalMiddleware
