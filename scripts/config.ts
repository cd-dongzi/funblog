import ip from 'ip'
import rootConfig from '@root/src/shared/config'
export default {
  __WEBPACK_HOST__: `${rootConfig.isHttps ? 'https' : 'http'}://${ip.address()}`,
  __WEBPACK_PORT__: rootConfig.app.server.clientPort,
  __WEBPACK_ADMIN_PORT__: rootConfig.app.server.adminPort,
  openBrowser: false
}
