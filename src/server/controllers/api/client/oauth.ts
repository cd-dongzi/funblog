import { DefaultState, Context } from 'koa'
import axios from 'axios'
import rootConfig from '@root/src/shared/config'
import { UserModel } from '@server/models/user'
import { google } from 'googleapis'
import { addUser, createToken } from './utils'
import { Controller, Ctx, Get, Query } from '@server/decorators'
const qqHost = 'https://graph.qq.com'
// 获取access_token by qq
const getAccessTokenByQQ = async (code: string) => {
  const url = `${qqHost}/oauth2.0/token`
  const { data } = await axios({
    method: 'GET',
    url,
    params: {
      code,
      grant_type: 'authorization_code',
      client_id: rootConfig.qq.oauth.appId,
      client_secret: rootConfig.qq.oauth.appKey,
      redirect_uri: rootConfig.qq.oauth.redirect_uri,
      fmt: 'json'
    }
  })
  return data.access_token
}
// 获取openid
const getOpenIdByQQ = async (access_token: string) => {
  const url = `${qqHost}/oauth2.0/me`
  const { data } = await axios({
    method: 'GET',
    url,
    params: {
      access_token,
      fmt: 'json'
    }
  })
  return data.openid
}

// 获取QQ信息
const getUserInfoByQQ = async (access_token: string, openid: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${qqHost}/user/get_user_info`,
    params: {
      access_token,
      oauth_consumer_key: rootConfig.qq.oauth.appId,
      openid
    }
  })
  return {
    name: data.nickname,
    avatar: data.figureurl_2
  }
}

// 获取access_token by github
const getAccessTokenByGithub = async (code: string) => {
  const url = `https://github.com/login/oauth/access_token?client_id=${rootConfig.github.oauth.client_id}&client_secret=${rootConfig.github.oauth.client_secret}&code=${code}`
  const { data } = await axios({
    method: 'POST',
    url,
    headers: {
      accept: 'application/json'
    }
  })
  return data.access_token
}
// 获取github信息
const getUserInfoByGithub = async (token: string) => {
  const { data } = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${token}`
    }
  })
  console.log(data)
  return {
    name: data.name,
    url: data.blog,
    email: data.email,
    avatar: data.avatar_url
  }
}

// 生成用户或更新用户
const createOrUpdateUser = async (filter: AnyObject, params: AnyObject, ctx: Context) => {
  // 先去更新，没有在生成
  let data = await UserModel.findOneAndUpdate(filter, params)
  // 新用户
  if (!data) {
    data = await addUser(ctx, {
      ...filter,
      ...params
    })
  }
  // token
  createToken(ctx, data._id)
}

@Controller('/client/user')
export default class ClientOauthController {
  oauth = rootConfig.google.oauth
  oAuth2Client = new google.auth.OAuth2(this.oauth.client_id, this.oauth.client_secret, this.oauth.redirect_uri)
  @Get('/oauth/github')
  async oauthGithub(@Query('code') code: string, @Ctx() ctx: Context) {
    try {
      if (code) {
        const access_token = await getAccessTokenByGithub(code)
        if (access_token) {
          // 获取github信息
          const { email, ...params } = await getUserInfoByGithub(access_token)
          // 先去更新，没有在生成
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
            data = await addUser(ctx, { email, ...params })
          }
          // token
          createToken(ctx, data._id)
        }
        ctx.redirect('/page/third-party')
      } else {
        ctx.redirect('/error')
      }
    } catch (e) {
      console.log('github => oauth error:', e)
      ctx.redirect('/error')
    }
  }

  @Get('/oauth/qq')
  async oauthQQ(@Query('code') code: string, @Ctx() ctx: Context) {
    if (code) {
      const accessToken = await getAccessTokenByQQ(code)
      // const accessToken = '808D667624EFB7D573A6CAE9456B82DE'
      const openId = await getOpenIdByQQ(accessToken)
      const userInfo = await getUserInfoByQQ(accessToken, openId)
      await createOrUpdateUser(
        {
          refId: openId
        },
        userInfo,
        ctx
      )
      ctx.redirect('/page/third-party')
    } else {
      throw '没检测到code, 请重新授权'
    }
  }

  @Get('/oauth/google')
  async oauthGoogle(@Query('code') code: string) {
    console.log('code', code)
    // 获取token, 需要代理
    const { tokens } = await this.oAuth2Client.getToken(code as string)
    console.log('tokens', tokens)
    this.oAuth2Client.setCredentials(tokens)
    return 'ok'
  }

  @Get('/oauth/google/url')
  async oauthGoogleUrl() {
    const scopes = ['https://www.googleapis.com/auth/userinfo.profile']
    const authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'select_account'
    })
    return authorizeUrl
  }
}
