import proxy from 'http-proxy-middleware'
import c2k from 'koa2-connect'

export default () => {
  return async (ctx, next) => {
    if (ctx.origin === 'http://localhost:3000') {
      proxy('/', {
        target: 'http://dzblog.cn',
        changeOrigin: true,
      })
    } else {
      await next()
    }

  }
}