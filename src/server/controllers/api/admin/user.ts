import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import { UserSystemModel } from '@server/models/userSystem'
import { filterObjByKey } from '@root/src/shared/utils'
import rootConfig from '@root/src/shared/config'
import serverConfig from '@server/config'
import md5 from 'md5'
import { Body, Controller, Cookie, Ctx, Get, Post, Middleware } from '@server/decorators'
import authTokenMiddleware from '@server/middleware/authToken'

@Controller('/admin')
@Middleware([authTokenMiddleware()])
export default class AdminUserController {
  @Post('/login')
  async login(@Body('username') username: string, @Body('password') password: string, @Ctx() ctx: Context) {
    const data = await UserSystemModel.findOne({
      username
    })
    if (!data) {
      throw '用户名不存在'
    }
    if (data.password !== md5(password)) {
      throw '密码不正确'
    }
    const payload = {
      _id: data._id
    }
    const token = jwt.sign(payload, serverConfig.adminJwtSecret, { expiresIn: '72h' })
    ctx.cookies.set(rootConfig.adminTokenKey, token, {
      httpOnly: false,
      expires: new Date(new Date().setDate(new Date().getDate() + 3))
    })
    return { ...filterObjByKey(data, ['password']), token }
  }

  @Get('/user/token')
  async getUserInfoByToken(@Cookie(rootConfig.adminTokenKey) token: string) {
    try {
      if (token) {
        const tokenData = jwt.verify(token as string, serverConfig.adminJwtSecret) as AnyObject
        const data = await UserSystemModel.findById(tokenData._id)
        return data
      } else {
        throw { code: 401 }
      }
    } catch (e) {
      throw { code: 401 }
    }
  }
}
