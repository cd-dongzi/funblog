import path from 'path'
import rootConfig from '@root/src/shared/config'
import utils from './utils'
import config from './config'

const rootPath = utils.resolve('./')
// client入口
const clientPath = utils.resolve('src/client')
const clientEntryPath = path.join(clientPath, 'main.tsx')
// server入口
const serverPath = utils.resolve('src/server')
const serverEntryPath = path.join(serverPath, 'main.ts')
// admin入口
const adminPath = utils.resolve('src/admin')
const adminEntryPath = path.join(adminPath, 'main.tsx')
// 输出目录
const buildPath = utils.resolve('dist')
const buildClientPath = path.join(buildPath, 'client')
const buildServerPath = path.join(buildPath, rootConfig.isDev ? 'server.dev' : 'server')
const buildAdminPath = path.join(rootPath, 'private/admin')
// 静态资源
const staticPath = utils.resolve('static')
// html template
const htmlTemplate = utils.resolve('template/index.html')
const adminHtmlTemplate = utils.resolve('template/admin.html')

export default {
  rootPath,
  clientPath,
  clientEntryPath,
  serverPath,
  serverEntryPath,
  adminPath,
  adminEntryPath,
  buildPath,
  buildClientPath,
  buildServerPath,
  buildAdminPath,
  staticPath,
  htmlTemplate,
  adminHtmlTemplate,
  publicPath: config.current.assetsPublicPath
}
