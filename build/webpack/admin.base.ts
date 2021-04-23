import webpack from 'webpack'
import merge from 'webpack-merge'
import { adminPlugins } from './plugins'
import { adminLoader } from './loaders'
import paths from '../paths'
import config from '../config'
import createBaseConfig from './base'

const baseClientConfig: webpack.Configuration = merge(createBaseConfig(), {
  mode: config.NODE_ENV,
  context: paths.rootPath,
  name: 'admin',
  target: 'web',
  entry: {
    main: paths.adminEntryPath
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': paths.adminPath,
      '@admin': paths.adminPath,
      '@root': paths.rootPath,
      '@server': paths.serverPath
    }
  },
  module: {
    rules: [...adminLoader]
  },
  plugins: [...adminPlugins]
})
export default baseClientConfig
