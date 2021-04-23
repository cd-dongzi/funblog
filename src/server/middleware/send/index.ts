import Koa from 'koa'
import statusCodeList from '@server/config/statusCodeList'

export type SendCallback = <T = any>(data: T, code?: number) => void
export type SendDataCallback = <T = any>(data: T, code?: number) => void
export type SendErrorCallback = <T = any>(msg: string, code?: number, data?: T) => void
export type SendCodeErrorCallback = <T = any>(code: number, data?: T) => void

function getMsg(code: number, msg?: string) {
  return msg || statusCodeList[code] || 'unknown error'
}

const sendMiddleware = () => {
  const send = (ctx: Koa.Context): SendCallback => {
    return (data, code = 0) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = JSON.stringify({
        code,
        data,
        message: getMsg(code)
      })
    }
  }
  const sendData = (ctx: Koa.Context): SendDataCallback => {
    return (data, code = 0) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = JSON.stringify({
        code,
        message: getMsg(code),
        ...data
      })
    }
  }
  const sendError = (ctx: Koa.Context): SendErrorCallback => {
    return (msg: string, code = 500, data) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = JSON.stringify({
        code,
        data,
        message: getMsg(code, msg)
      })
    }
  }
  const sendCodeError = (ctx: Koa.Context): SendCodeErrorCallback => {
    return (code: number, data) => {
      ctx.set('Content-Type', 'application/json')
      ctx.status = code
      ctx.throw(code, getMsg(code))
    }
  }
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.send = send(ctx)
    ctx.sendError = sendError(ctx)
    ctx.sendCodeError = sendCodeError(ctx)
    ctx.sendData = sendData(ctx)
    await next()
  }
}

export default sendMiddleware
