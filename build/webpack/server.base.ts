import nodeExternals from 'webpack-node-externals'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { serverPlugins } from './plugins'
import { serverLoader } from './loaders'
import config from '../config'
import paths from '../paths'
import createBaseConfig from './base'

const serverBaseWebpackConfig: webpack.Configuration = merge(createBaseConfig(), {
  mode: config.NODE_ENV,
  cache: {
    type: 'filesystem'
  },
  context: paths.rootPath,
  name: 'server',
  target: 'node',
  entry: {
    main: paths.serverEntryPath
  },
  output: {
    path: paths.buildServerPath,
    publicPath: paths.publicPath,
    filename: 'entry.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': paths.clientPath,
      '@client': paths.clientPath,
      '@root': paths.rootPath,
      '@server': paths.serverPath
    }
  },
  module: {
    rules: [...serverLoader]
  },
  externals: nodeExternals({
    allowlist: [/\.(css|less)$/]
  }),
  node: {
    __dirname: false
  },
  plugins: [...serverPlugins]
})
export default serverBaseWebpackConfig
