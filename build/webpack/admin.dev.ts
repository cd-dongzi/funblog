import webpack from 'webpack'
import merge from 'webpack-merge'
import paths from '../paths'
import baseAdminConfig from './admin.base'

const devWebpackConfig = merge(baseAdminConfig, {
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
    path: paths.buildPath
  },
  devtool: 'eval-source-map',
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
export default devWebpackConfig
