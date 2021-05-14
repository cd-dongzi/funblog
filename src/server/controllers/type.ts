/* 
const metadata ={
  controllers: {
    TestController: {
      actions: {
        getName: {
          method: 'get',
          path: '/name',
          target: [Function: getName],
          arguments: [],
          middlewares: []
        }
      },
      middlewares: []
      class: [Function: TestController],
      basePath: '/test'
    }
  }
}
*/
import Koa, { DefaultState, Context, Middleware } from 'koa'
import KoaRouter from 'koa-router'

export type Router = KoaRouter<DefaultState, Context>
export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'
export type argumentSource =
  | 'ctx'
  | 'query'
  | 'params'
  | 'body'
  | 'header'
  | 'request'
  | 'req'
  | 'response'
  | 'res'
  | 'session'
  | 'cookie'
  | 'token'
export type argumentOptions =
  | string
  | {
      value?: string
      required?: boolean
      requiredList?: string[]
    }
export type MetaDataArguments = {
  source: argumentSource
  options?: argumentOptions
}
export interface MetaDataActions {
  [k: string]: {
    method: Method
    path: string
    target: (...args: any) => void
    arguments?: {
      [k: string]: MetaDataArguments
    }
    middlewares?: Koa.Middleware[]
  }
}
export interface MetaDataController {
  actions: MetaDataActions
  basePath?: string | string[]
  middlewares?: Koa.Middleware[]
}
export interface MetaData {
  controllers: {
    [k: string]: MetaDataController
  }
}

export interface ControllerOptions {
  router: Router
  controllerPaths: string[]
  basePath?: string
  middlewares?: Middleware[]
}
