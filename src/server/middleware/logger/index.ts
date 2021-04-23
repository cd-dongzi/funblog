import Koa, { Next } from 'koa'
import createLogger, { LogOptions } from '@server/utils/log'
import { getClientIp } from '@server/utils/system'
import ErrorUtils from '@server/utils/error'
import Sentry from '@server/utils/sentry'
import Type from '@root/src/shared/type'

const logInfo = (ctx: Koa.Context, options = {} as any) => {
  const { method, url, host, headers } = ctx.request
  let obj: AnyObject = {
    method,
    url,
    host,
    ip: getClientIp(ctx),
    referer: headers['referer'],
    userAgent: headers['user-agent']
  }
  if (typeof options === 'string') {
    obj['message'] = options
  } else {
    obj = {
      ...obj,
      ...options
    }
  }
  return obj
}

// 所有请求打印
const loggerMiddleware = (options = {} as LogOptions) => {
  const logger = createLogger(options)
  return async (ctx: Koa.Context, next: Next) => {
    const start = Date.now()
    ctx.log = logger
    try {
      await next()
      const end = Date.now() - start
      logger.http.info(
        logInfo(ctx, {
          responseTime: `${end}ms`
        })
      )
    } catch (e) {
      if (Type.isError(e)) {
        console.log(e)
        Sentry.captureException(e)
      }
      const message = ErrorUtils.getErrorMsg(e)
      const end = Date.now() - start
      logger.http.error(
        logInfo(ctx, {
          message,
          responseTime: `${end}ms`
        })
      )
    }
  }
}

// api日志打印
const loggerApiMiddleware = (options = {} as LogOptions) => {
  const logger = createLogger(options)
  return async (ctx: Koa.Context, next: Next) => {
    const start = Date.now()
    try {
      await next()
      const end = Date.now() - start
      logger.api.info(
        logInfo(ctx, {
          responseTime: `${end}ms`
        })
      )
    } catch (e) {
      const message = ErrorUtils.getErrorMsg(e)
      const end = Date.now() - start
      logger.api.error(
        logInfo(ctx, {
          message,
          responseTime: `${end}ms`
        })
      )
      throw e
    }
  }
}

export { loggerApiMiddleware, loggerMiddleware }
