import webpack from 'webpack'
import merge from 'webpack-merge'
import baseClientConfig from './client.base'

const devWebpackConfig = merge(baseClientConfig, {
  output: {
    filename: 'js/[name].js'
  },
  devtool: 'eval-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: 'lib',
          chunks: 'all'
        },
        style: {
          test: /\.(less|css)$/,
          name: 'style',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
export default devWebpackConfig
