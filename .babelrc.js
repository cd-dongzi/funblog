const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
      },
      useBuiltIns: 'usage', // 按需加载polyfill
      corejs: 3
    }
  ],
  '@babel/preset-react',
  ['@babel/preset-typescript', { onlyRemoveTypeImports: true }]
]
const plugins = [
  '@babel/plugin-transform-runtime',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ["@babel/plugin-proposal-private-methods", { "loose": true }],
  'babel-plugin-parameter-decorator', // 配置这个插件，@babel/plugin-proposal-decorators无法解析@Arg参数
  'syntax-dynamic-import',
  '@loadable/babel-plugin'
]

module.exports = { presets, plugins }
