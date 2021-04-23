const { presets, plugins } = require('../../.babelrc.js')
module.exports = {
  presets,
  plugins: [
    ...plugins,
    [
      'import',
      {
        libraryName: 'antd',
        style: true
      }
    ]
  ]
}