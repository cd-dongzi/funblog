import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import rootConfig from '@root/src/shared/config'
import utils from '../utils'

const includeFiles = [utils.resolve('src'), utils.resolve('build'), utils.resolve('scripts')]

const babelLoader = (
  { options = {}, include = [] } = {} as {
    options: any
    include?: any[]
  }
) => {
  return {
    test: /\.(js|jsx|ts|tsx)$/,
    include: [...includeFiles, ...include],
    use: [
      {
        loader: 'babel-loader',
        options: {
          ...options
        }
      }
    ]
  }
}

const cssLoadder = (
  { extract = true, include = [] } = {} as {
    extract?: boolean
    include?: any[]
  }
) => {
  let use = ['css-loader', 'postcss-loader']
  if (extract) {
    use = [MiniCssExtractPlugin.loader, ...use]
  }
  return {
    test: /\.css$/,
    include: [...includeFiles, utils.resolve('node_modules/normalize.css'), ...include],
    use
  }
}

const lessLoader = (
  { extract = true, insertStyle = false, patterns = [], options = {}, include = [] } = {} as {
    extract?: boolean
    insertStyle?: boolean
    options?: any
    patterns?: any[]
    include?: any[]
  }
) => {
  let use: any[] = ['css-loader', 'postcss-loader']
  use = [
    ...use,
    {
      loader: 'less-loader',
      options
    }
  ]
  if (insertStyle && patterns) {
    use = [
      ...use,
      {
        loader: 'style-resources-loader',
        options: {
          patterns
        }
      }
    ]
  }
  if (extract) {
    use = [MiniCssExtractPlugin.loader, ...use]
  }
  return {
    test: /\.less$/,
    include: [...includeFiles, utils.resolve('node_modules/swiper'), ...include],
    use
  }
}

const createAssetRule = (test: RegExp, dir: string) => {
  return {
    test: test,
    include: [...includeFiles],
    type: 'asset',
    generator: {
      filename: `static/${dir}/[name]${rootConfig.isProd ? '.[contenthash:7]' : ''}[ext]`
    },
    parser: {
      dataUrlCondition: {
        maxSize: 4 * 1024
      }
    }
  }
}

const assetsLoader = [
  createAssetRule(/\.(png|jpe?g|gif|svg|ico|cur)(\?.*)?$/, 'img'),
  createAssetRule(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, 'media'),
  createAssetRule(/\.(woff2?|eot|ttf|otf)(\?.*)?$/, 'font')
]

export const serverLoader = [babelLoader(), cssLoadder({ extract: false }), lessLoader({ extract: false }), ...assetsLoader]

export const clientLoader = [babelLoader(), cssLoadder(), lessLoader(), ...assetsLoader]

export const adminLoader = [
  babelLoader({
    options: { configFile: utils.resolve('src/admin/.babelrc.js') },
    include: [utils.resolve('node_modules/rc-upload')]
  }),
  cssLoadder({
    include: [utils.resolve('node_modules/react-markdown-editor-lite')]
  }),
  lessLoader({
    options: {
      lessOptions: {
        javascriptEnabled: true
      }
    },
    insertStyle: true,
    patterns: [utils.resolve('src/admin/styles/var.less')],
    include: [utils.resolve('node_modules/antd')]
  }),
  ...assetsLoader
]
