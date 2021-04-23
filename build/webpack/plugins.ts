import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'
import SentryWebpackPlugin from '@sentry/webpack-plugin'
import paths from '../paths'
import config from '../config'

type Plugin = { apply(...args: any[]): void }

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: config.isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
  chunkFilename: config.isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css'
})

const caseSensitivePathsPlugin = new CaseSensitivePathsPlugin()
const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: paths.staticPath,
      to: 'static'
    }
  ]
})

const serverPlugins = [
  new webpack.DefinePlugin({
    'process.env.BROWSER_ENV': 'false',
    'process.env.REACT_ENV': '"server"'
  }),
  caseSensitivePathsPlugin
]

const clientPlugins = [
  new webpack.ProvidePlugin({
    process: 'process/browser'
  }),
  new webpack.DefinePlugin({
    'process.env.BROWSER_ENV': 'true',
    'process.env.REACT_ENV': '"client"'
  }),
  miniCssExtractPlugin,
  caseSensitivePathsPlugin,
  copyWebpackPlugin,
  new LoadablePlugin() as Plugin
]

const adminPlugins = [
  new webpack.ProvidePlugin({
    process: 'process/browser'
  }),
  new webpack.DefinePlugin({
    'process.env.BROWSER_ENV': 'true',
    'process.env.REACT_ENV': '"admin"'
  }),
  miniCssExtractPlugin,
  caseSensitivePathsPlugin,
  copyWebpackPlugin,
  //配置html入口信息
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: paths.adminHtmlTemplate,
    favicon: 'static/admin_favicon.ico',
    inject: true
  })
]

if (config.openSentrySourceMap && !process.env.NODE_PREVIEW) {
  clientPlugins.push(
    new SentryWebpackPlugin({
      include: paths.buildClientPath
    })
  )
  serverPlugins.push(
    new SentryWebpackPlugin({
      include: paths.buildServerPath
    })
  )
}

if (!!process.env.NODE_PREVIEW) {
  const admin = new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
    analyzerPort: 8889
  })
  const client = new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
    analyzerPort: 8888
  })
  if (process.env.BUILD_ENV === 'admin') {
    adminPlugins.push(admin)
  } else if (process.env.BUILD_ENV === 'client') {
    clientPlugins.push(client)
  } else if (process.env.BUILD_ENV === 'server') {
    adminPlugins.push(admin)
    clientPlugins.push(client)
  }
}

export { serverPlugins, clientPlugins, adminPlugins }
