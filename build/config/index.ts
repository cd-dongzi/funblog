import dev from './dev'
import prod from './prod'
import rootConfig from '@root/src/shared/config'

const isDev = rootConfig.isDev
export default {
  NODE_ENV: rootConfig.NODE_ENV,
  isDev,
  dev,
  prod,
  openSentrySourceMap: rootConfig.openSentrySourceMap,
  current: isDev ? dev : prod
}
