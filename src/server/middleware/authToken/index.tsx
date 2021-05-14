import Koa, { Next } from 'koa'
import jwt from 'jsonwebtoken'
import rootConfig from '@root/src/shared/config'
import serverConfig from '@server/config'

const authTokenMiddleware = () => {
  return async (ctx: Koa.Context, next: Next) => {
    if (serverConfig.adminAuthApiWhiteList.some((path) => path === ctx.path)) {
      return await next()
    }
    const token = ctx.cookies.get(rootConfig.adminTokenKey)
    if (!token) {
      throw {
        code: 401
      }
    } else {
      try {
        jwt.verify(token, serverConfig.adminJwtSecret)
      } catch (e) {
        console.log(444)
        throw {
          code: 401
        }
      }
    }
    await next()
  }
}
export default authTokenMiddleware
