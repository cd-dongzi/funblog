import { metadata } from '@server/controllers'
import Koa from 'koa'
import { argumentOptions, Method, argumentSource } from '@server/controllers/type'
import Type from '@root/src/shared/type'
import rootConfig from '@root/src/shared/config'

interface AddMethodParmas {
  method: Method
  path: string
  object: any
  methodName: string
}
interface AddMethodArgumentParmas {
  object: any
  methodName: string
  index: number
  source: argumentSource
  options?: argumentOptions
}
// 融合@Arg options
const _mergeArgsParamsToOptions = (options?: string | argumentOptions, required?: boolean): undefined | string | argumentOptions => {
  if (Type.isString(options) && Type.isBoolean(required)) {
    return {
      value: options,
      required
    } as argumentOptions
  }
  return options
}
// 记录每个action
const _addMethod = ({ method, path, object, methodName }: AddMethodParmas) => {
  const controller = metadata.controllers[object.constructor.name] || {}
  const actions = controller.actions || {}
  const o = {
    method,
    path,
    target: object[methodName].bind(object)
  }
  actions[methodName] = {
    ...(actions[methodName] || {}),
    ...o
  }
  controller.actions = actions
  metadata.controllers[object.constructor.name] = controller
}
// 记录每个action的参数
const _addMethodArgument = ({ object, methodName, index, source, options }: AddMethodArgumentParmas) => {
  const controller = metadata.controllers[object.constructor.name] || {}
  controller.actions = controller.actions || {}
  controller.actions[methodName] = controller.actions[methodName] || {}
  const args = controller.actions[methodName].arguments || {}
  args[String(index)] = {
    source,
    options
  }
  controller.actions[methodName].arguments = args
  metadata.controllers[object.constructor.name] = controller
}
// 控制器
export const Controller = (basePath: string | string[]) => {
  return (classDefinition: any): void => {
    const controller = metadata.controllers[classDefinition.name] || {}
    controller.basePath = basePath
    metadata.controllers[classDefinition.name] = controller
  }
}

// Get
export const Get = (path: string) => {
  return (object: any, methodName: string) => {
    _addMethod({
      method: 'get',
      path: path,
      object,
      methodName
    })
  }
}

// Post
export const Post = (path: string) => {
  return (object: any, methodName: string) => {
    _addMethod({
      method: 'post',
      path: path,
      object,
      methodName
    })
  }
}

// Delete
export const Delete = (path: string) => {
  return (object: any, methodName: string) => {
    _addMethod({
      method: 'delete',
      path: path,
      object,
      methodName
    })
  }
}

// Put
export const Put = (path: string) => {
  return (object: any, methodName: string) => {
    _addMethod({
      method: 'put',
      path: path,
      object,
      methodName
    })
  }
}

// Patch
export const Patch = (path: string) => {
  return (object: any, methodName: string) => {
    _addMethod({
      method: 'patch',
      path: path,
      object,
      methodName
    })
  }
}

// Query
export const Query = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'query',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Body
export const Body = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'body',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Params
export const Params = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'params',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Ctx
export const Ctx = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'ctx',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Header
export const Header = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'header',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Req
export const Req = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'req',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Request
export const Request = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'request',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Res
export const Res = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'res',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Response
export const Response = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'response',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Cookie
export const Cookie = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'cookie',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Session
export const Session = (options?: string | argumentOptions, required?: boolean) => {
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'session',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}

// Middleware
export const Middleware = (middleware: Koa.Middleware | Koa.Middleware[]) => {
  const middlewares = Array.isArray(middleware) ? middleware : [middleware]
  return (object: any, methodName?: string) => {
    // 给controller加中间件
    if (typeof object === 'function') {
      const controller = metadata.controllers[object.name] || {}
      controller.middlewares = middlewares
    } else if (typeof object === 'object' && methodName) {
      // 给action加
      const controller = metadata.controllers[object.constructor.name] || {}
      controller.actions = controller.actions || {}
      controller.actions[methodName] = controller.actions[methodName] || {}
      controller.actions[methodName].middlewares = middlewares
      metadata.controllers[object.constructor.name] = controller
    }
  }
}

// Token
export const Token = (options?: string | argumentOptions, required?: boolean) => {
  options = options || rootConfig.loginTokenKey
  return (object: any, methodName: string, index: number) => {
    _addMethodArgument({
      object,
      methodName,
      index,
      source: 'token',
      options: _mergeArgsParamsToOptions(options, required)
    })
  }
}
