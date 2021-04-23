import devMiddleware from 'webpack-dev-middleware' // 锁定版本， 避免res.getHeader is not a function
import webpack from 'webpack'
import Koa from 'koa'

export default (compiler: webpack.Compiler, opts: devMiddleware.Options) => {
  const expressMiddleware: any = devMiddleware(compiler, opts)
  async function middleware(ctx: Koa.Context, next: Koa.Next) {
    await expressMiddleware(
      ctx.req,
      {
        send: (content: any) => {
          ctx.body = content
        },
        setHeader: (name: string, value: any) => {
          ctx.set(name, value)
        }
      },
      next
    )
  }

  middleware.getFilenameFromUrl = expressMiddleware.getFilenameFromUrl
  middleware.waitUntilValid = expressMiddleware.waitUntilValid
  middleware.invalidate = expressMiddleware.invalidate
  middleware.close = expressMiddleware.close
  middleware.fileSystem = expressMiddleware.fileSystem

  return middleware
}
