import { Context } from 'koa'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import serverConfig from '@server/config'
import rootConfig from '@root/src/shared/config'
import { randNumber } from '@root/src/shared/utils'
import { UserModel, UserDocument } from '@server/models/user'
import { getClientIp, getDataByUa, getLocationByIp } from '@server/utils/system'

export const checkEmailByUser = (email: string) => {
  const hasAuthor = serverConfig.loginEmailWhiteList.find((e) => e === email)
  if (hasAuthor) {
    return true
  }
  return false
}

// 获取系统参数
const getSystemParams = (ctx: Context) => {
  const ip = getClientIp(ctx)
  return {
    ip,
    location: getLocationByIp(ip),
    system: getDataByUa(ctx.request.headers['user-agent'] as string)
  }
}

// 添加用户
export const addUser = (ctx: Context, params: AnyObject): Promise<UserDocument> => {
  const createAvatar = () => {
    const num = randNumber(1, 21)
    return `${ctx.protocol}://${ctx.host}/avatar/${num}.jpg`
  }
  return new Promise(async (resolve, reject) => {
    if (!params.avatar) {
      params['avatar'] = createAvatar()
    }
    try {
      const data = await UserModel.create({
        ...params,
        userAgent: ctx.request.headers['user-agent'],
        ...getSystemParams(ctx)
      })
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

// 生成token
export const createToken = (ctx: Context, _id: string) => {
  const payload = {
    _id
  }
  const token = jwt.sign(payload, serverConfig.jwtSecret, { expiresIn: '72h' })
  ctx.cookies.set(rootConfig.loginTokenKey, token, {
    httpOnly: true,
    expires: new Date(new Date().setDate(new Date().getDate() + 3))
  })
}

// 发送数据
export const sendData = (data: UserDocument) => {
  return {
    name: data?.name,
    url: data?.url,
    email: data?.email,
    avatar: data?.avatar,
    _id: data?._id
  }
}

// 获取token用户信息
export const getTokenInfo = (
  ctx: Context
):
  | {
      _id: string
    }
  | AnyObject => {
  const token = (ctx.cookies.get(rootConfig.loginTokenKey) || ctx.header[rootConfig.loginTokenKey]) as string
  if (token) {
    try {
      const tokenInfo: any = jwt.verify(token, serverConfig.jwtSecret)
      return tokenInfo
    } catch (e) {
      return {}
    }
  } else {
    return {}
  }
}
