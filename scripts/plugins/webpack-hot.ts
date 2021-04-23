import hotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import Koa from 'koa'
import stream from 'stream'
const PassThrough = stream.PassThrough

export default (compiler: webpack.Compiler, opts: any = {}) => {
  opts.path = opts.path || '/__webpack_hmr'
  const middleware: any = hotMiddleware(compiler, opts)
  return async (ctx: Koa.Context, next: Koa.Next) => {
    if (ctx.request.path !== opts.path) {
      return next()
    }
    const stream = new PassThrough()
    ctx.body = stream
    await middleware(
      ctx.req,
      {
        write: stream.write.bind(stream),
        writeHead: (status: number, headers: any) => {
          ctx.status = status
          ctx.set(headers)
        },
        end: () => {
          stream.end()
        }
      },
      next
    )
  }
}
