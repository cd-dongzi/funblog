import merge from 'webpack-merge'
import baseClientConfig from './client.base'

const prodWebpackConfig = merge(baseClientConfig, {
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
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
