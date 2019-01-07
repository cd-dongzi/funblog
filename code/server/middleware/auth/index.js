import jwt from 'jsonwebtoken'
import conf from 'config'
import {
  get_client_ip
} from 'utils/system'
export default () => {
  return async (ctx, next) => {
    if (ctx.path.indexOf('/login') >= 0) {
      return await next()
    }
    console.log('客户端IP：' + get_client_ip(ctx))
    let token = ctx.cookies.get(conf.auth.tokenKey)
    console.log('Token:' + token)
    let tokenAuth
    try {
      tokenAuth = jwt.verify(token, conf.auth.admin_secret)
    } catch (e) {
      if ('TokenExpiredError' === e.name) {
        ctx.throw(401, 'token expired,请及时本地保存数据！')
      }
      ctx.throw(401, 'invalid token')
    }
    await next()
  }
}
