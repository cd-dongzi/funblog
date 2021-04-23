import { SendCallback, SendErrorCallback, SendCodeErrorCallback, SendDataCallback } from '@server/middleware/send'
import { Logger } from '@server/utils/log'

// // 为 Context 类型扩展自定义属性
declare module 'koa' {
  interface DefaultContext {
    send: SendCallback
    sendError: SendErrorCallback
    sendCodeError: SendCodeErrorCallback
    sendData: SendDataCallback
    log: Logger
  }
}
