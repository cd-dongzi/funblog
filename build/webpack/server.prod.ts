import merge from 'webpack-merge'
import serverBaseConfig from './server.base'

const serverProdWebpackConfig = merge(serverBaseConfig, {
  devtool: 'source-map',
  optimization: {
    // 不进行压缩混淆了，会导致装饰器装饰的class类名被修改
    minimize: false
  }
})
export default serverProdWebpackConfig
