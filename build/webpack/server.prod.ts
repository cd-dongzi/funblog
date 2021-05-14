import merge from 'webpack-merge'
import serverBaseConfig from './server.base'

const serverProdWebpackConfig = merge(serverBaseConfig, {
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
})
export default serverProdWebpackConfig
