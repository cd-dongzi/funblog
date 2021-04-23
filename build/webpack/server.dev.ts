import merge from 'webpack-merge'
import serverBaseConfig from './server.base'

const serverDevWebpackConfig = merge(serverBaseConfig, {
  devtool: 'eval-source-map'
})
export default serverDevWebpackConfig
