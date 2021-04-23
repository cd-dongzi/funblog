import Koa, { Next } from 'koa'
import ErrorUtils from '@server/utils/error'

const routerErrorMiddleware = () => {
  return async (ctx: Koa.Context, next: Next) => {
    try {
      await next()
    } catch (e) {
      const error = ErrorUtils.parse(e)
      if (typeof error === 'string') {
        ctx.sendError(error, 500, null)
        throw e
      }
      if (error.code) {
        ctx.sendCodeError(error.code, error.data || null)
        throw e
      }
      ctx.sendError('Internal Server Error', 500, error)
      throw e
    }
  }
}
export default routerErrorMiddleware
