import config from './config'
const NODE_ENV = process.env.NODE_ENV as ENV
const isProd = NODE_ENV === 'production'
const isDev = NODE_ENV === 'development'
const env = NODE_ENV
const isHttps = true
// 开发环境 文件端口
const clientPort = 3012
// 管理后台端口
const adminPort = 3022
const devHttpPort = 3001
const devHttpsPort = 3000
const prodHttpPort = devHttpPort
const prodHttpsPort = devHttpsPort
const dev = {
  server: {
    clientPort,
    adminPort,
    httpPort: devHttpPort,
    httpsPort: devHttpsPort,
    protocol: isHttps ? 'https' : 'http',
    host: 'localhost',
    port: isHttps ? devHttpsPort : devHttpPort
  }
}

const prod = {
  server: {
    clientPort,
    adminPort,
    httpPort: prodHttpPort,
    httpsPort: prodHttpsPort,
    protocol: isHttps ? 'https' : 'http',
    host: 'localhost',
    port: isHttps ? prodHttpsPort : prodHttpPort
  }
}
type LoginTokenKey = 'authorization'
// oss
export const bucket = 'bucket'
export const region = 'region'
export const prefix = `prefix`

export default {
  env,
  isProd,
  isDev,
  NODE_ENV,
  isHttps,
  loginTokenKey: 'authorization' as LoginTokenKey,
  adminTokenKey: 'a_token',
  jwtSecret: config.jwtSecret,
  adminJwtSecret: config.adminJwtSecret,
  fileSeparation: '__@__',
  openSentry: false,
  openSentrySourceMap: false,
  github: config.github,
  google: config.google,
  qq: config.qq,
  sms: config.sms,
  imgHost: 'img.dzblog.cn',
  head: {
    title: `Blog | Just for fun`,
    meta: {
      keywords: '技术博客,前端,JavaScript,HTML,CSS,React,Koa,TypeScript,SSR',
      description: '这是描述'
    }
  },
  openOss: false,
  oss: {
    bucket,
    region,
    prefix,
    ...config.oss
  },
  sentry: config.sentry,
  mongodb: isProd ? config.mongodb.prod : config.mongodb.dev,
  loginEmailWhiteList: config.loginEmailWhiteList,
  authorSecret: config.authorSecret,
  dev,
  prod,
  staticFilesOptions: {
    maxAge: 31536000 * 1000
  } as any,
  app: isProd ? prod : dev
}
