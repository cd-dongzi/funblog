import webpack from 'webpack'
import merge from 'webpack-merge'
import { clientPlugins } from './plugins'
import { clientLoader } from './loaders'
import paths from '../paths'
import config from '../config'
import createBaseConfig from './base'

const baseClientConfig: webpack.Configuration = merge(createBaseConfig(), {
  mode: config.NODE_ENV,
  context: paths.rootPath,
  name: 'client',
  target: ['web', 'es5'],
  entry: {
    main: paths.clientEntryPath
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
  output: {
    path: paths.buildClientPath,
    publicPath: paths.publicPath
  },
  module: {
    rules: [...clientLoader]
  },
  plugins: [...clientPlugins]
})
export default baseClientConfig
