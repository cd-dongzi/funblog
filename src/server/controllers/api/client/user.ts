import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import serverConfig from '@server/config'
import { UserModel, UserDocument } from '@server/models/user'
import { Body, Controller, Cookie, Ctx, Get, Params, Post, Put, Token } from '@server/decorators'
import rootConfig from '@root/src/shared/config'
import { checkEmailByUser, createToken, addUser, sendData } from './utils'

@Controller('/client/user')
export default class ClientUserController {
  // 登录
  @Post('/login')
  async login(@Body() body: UserDocument, @Ctx() ctx: Context, @Cookie('author_secret') authorSecret: string) {
    const { email, ...params } = body
    const hasAuthor = checkEmailByUser(email)
    if (hasAuthor && rootConfig.authorSecret !== authorSecret) {
      throw '此账号不支持登录'
    }
    let data = await UserModel.findOneAndUpdate(
      {
        email
      },
      params,
      {
        new: true
      }
    )
    // 新用户
    if (!data) {
      if (!params.name) {
        throw '请输入昵称'
      }
      data = await addUser(ctx, ctx.request.body)
    }
    createToken(ctx, data._id)
    return sendData(data)
  }
  // 登出
  @Post('/logout')
  async logout(@Ctx() ctx: Context) {
    ctx.cookies.set(rootConfig.loginTokenKey, '', {
      maxAge: 0
    })
  }
  // 通过token获取用户信息
  @Get('/info/token')
  async getUserInfoByToken(@Token() token: string) {
    try {
      const tokenInfo = jwt.verify(token, serverConfig.jwtSecret) as AnyObject
      if (tokenInfo) {
        const data = await UserModel.findOne({
          _id: tokenInfo._id
        })
        return data
      }
      return null
    } catch (e) {
      return null
    }
  }
  // 更新
  @Put('/:id')
  async updateUser(@Params('id') id: string, @Body() params: UserDocument) {
    if (!id) {
      throw '暂无此用户信息'
    }
    if (!params.email) {
      throw '请输入邮箱'
    }
    if (!params.name) {
      throw '请输入昵称'
    }
    const hasAuthor = checkEmailByUser(params.email)
    if (hasAuthor) {
      throw '此账号不支持更新'
    }
    const data = await UserModel.findOneAndUpdate(
      {
        _id: id
      },
      params,
      {
        new: true
      }
    )
    if (!data) {
      throw '暂无此用户信息'
    }
    return sendData(data)
  }
}
