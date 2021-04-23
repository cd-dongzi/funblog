import merge from 'webpack-merge'
import rootConfig from '@root/src/shared/config'
import baseAdminConfig from './admin.base'
import paths from '../paths'

const prodWebpackConfig = merge(baseAdminConfig, {
  output: {
    path: paths.buildAdminPath,
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: rootConfig.isProd ? '/admin/' : '/'
  },
  devtool: 'source-map',
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: []
})
export default prodWebpackConfig
