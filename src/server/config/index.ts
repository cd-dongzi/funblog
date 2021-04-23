import path from 'path'
import fs from 'fs'
import rootConfig from '@root/src/shared/config'
import paths from '@root/build/paths'

const httpsOptions = {
  key: fs.readFileSync(path.resolve(paths.serverPath, `ssl/dev/server.key`)),
  cert: fs.readFileSync(path.resolve(paths.serverPath, `ssl/dev/server.crt`))
}
export default {
  isProd: rootConfig.isProd,
  mongodb: {
    address: '127.0.0.1:27017',
    auth: true,
    authSource: 'admin',
    ...rootConfig.mongodb
  },
  httpsOptions,
  loginEmailWhiteList: rootConfig.loginEmailWhiteList,
  staticDir: 'public',
  jwtSecret: rootConfig.jwtSecret,
  adminJwtSecret: rootConfig.adminJwtSecret,
  adminAuthApiWhiteList: ['/api/admin/login'],
  log: rootConfig.isProd
    ? {
        logLevel: 'all',
        dir: 'logs/production'
      }
    : {
        logLevel: 'all',
        dir: 'logs/development'
      }
}
