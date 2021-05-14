import { Context, Middleware } from 'koa'
import Type from '@root/src/shared/type'
import { Router, MetaData, MetaDataController, ControllerOptions, MetaDataArguments, argumentSource, argumentOptions } from './type'
import ErrorUtils from '@server/utils/error'

// 验证操作返回值
const _argumentInjectorProcessor = (source: argumentSource, data: any, options: argumentOptions) => {
  if (!options) {
    return data
  }
  if (typeof options === 'string' && Type.isObject(data)) {
    return data[options]
  }
  if (typeof options === 'object') {
    if (options.value) {
      const val = data[options.value]
      if (options.required && Type.isEmpty(val)) {
        ErrorUtils.error(`[${source}] [${options.value}]参数不能为空`)
      }
      return val
    }
    // require数组校验
    if (options.requiredList && Type.isArray(options.requiredList) && Type.isObject(data)) {
      for (const key of options.requiredList) {
        if (Type.isEmpty(data[key])) {
          ErrorUtils.error(`[${source}] [${key}]参数不能为空`)
        }
      }
      return data
    }
    if (options.required) {
      if (Type.isEmptyObject(data)) {
        ErrorUtils.error(`${source}中有必填参数`)
      }
      return data
    }
  }
  ErrorUtils.error(`[${source}] ${JSON.stringify(options)} 参数错误`)
}

// 需要检验的方法
const _argumentInjectorTranslations = {
  ctx: (ctx: Context) => ctx,
  session: (ctx: Context, options: argumentOptions) => {
    if (typeof options === 'string') {
      return ctx.session[options]
    }
    return ctx.session
  },
  cookie: (ctx: Context, options: argumentOptions) => {
    if (typeof options === 'string') {
      return ctx.cookies.get(options)
    }
    return ctx.cookies
  },
  token: (ctx: Context, options: argumentOptions) => {
    if (typeof options === 'string') {
      return ctx.cookies.get(options) || ctx.header[options]
    }
    return ''
  },
  query: (ctx: Context, options: argumentOptions, source: argumentSource) => {
    return _argumentInjectorProcessor(source, ctx.query, options)
  },
  params: (ctx: Context, options: argumentOptions, source: argumentSource) => {
    return _argumentInjectorProcessor(source, ctx.params, options)
  },
  body: (ctx: Context, options: argumentOptions, source: argumentSource) => {
    return _argumentInjectorProcessor(source, ctx.request.body, options)
  }
} as Record<argumentSource, (...args: any) => any>

// 对参数进行处理跟验证
const _determineArgument = (ctx: Context, { options, source }: MetaDataArguments, opts: ControllerOptions) => {
  let result
  // 需要的校验
  if (_argumentInjectorTranslations[source]) {
    result = _argumentInjectorTranslations[source](ctx, options, source)
  } else {
    result = ctx[source]
    if (result && options && typeof options === 'string') {
      result = result[options]
    }
  }
  return result
}

// 生成单个路由
const _generateRoute = (router: Router, controller: MetaDataController, basePath: string, options: ControllerOptions) => {
  const actions = Object.values(controller.actions)
  actions.forEach((action) => {
    const path =
      '/' +
      (basePath + action.path)
        .split('/')
        .filter((i) => i.length)
        .join('/')
    const midddlewares = [...(options.middlewares || []), ...(controller.middlewares || []), ...(action.middlewares || [])]
    midddlewares.push(async (ctx) => {
      const targetArguments: any[] = []
      if (action.arguments) {
        const keys = Object.keys(action.arguments)
        for (const key of keys) {
          const argumentData = action.arguments[key]
          targetArguments[Number(key)] = _determineArgument(ctx, argumentData, options)
        }
      }
      const data: any = await action.target(...targetArguments)
      if (data !== 'CUSTOM') {
        ctx.send(data === undefined ? null : data)
      }
    })
    router[action.method](path, ...(midddlewares as Middleware[]))
  })
}

// 生成路由
export const generateRoutes = (router: Router, metadata: MetaData, options: ControllerOptions) => {
  const rootBasePath = options.basePath || ''
  const controllers = Object.values(metadata.controllers)
  controllers.forEach((controller) => {
    if (controller.basePath) {
      controller.basePath = Array.isArray(controller.basePath) ? controller.basePath : [controller.basePath]
      controller.basePath.forEach((basePath) => {
        _generateRoute(router, controller, rootBasePath + basePath, options)
      })
    }
  })
}
