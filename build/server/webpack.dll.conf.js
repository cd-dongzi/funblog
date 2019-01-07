const path = require('path')
const webpack = require('webpack');
const rm = require("rimraf");

const isProd = process.env.NODE_ENV === 'production'
const name = 'lib'
const dir = path.resolve(__dirname, '../../static/client/js/')
const plugins = [
  new webpack.DllPlugin({
    path: path.resolve(__dirname, './manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
    name: '[name]',
    context: path.resolve(__dirname, '../../')
  })
]
const output = {
  filename: 'dll/dev.[name].dll.js',
  path: dir,
  library: '[name]'
}


if (isProd) {
  output.filename = 'dll/prod.[name].dll.js'
}
const dll = {
  mode: isProd ? 'production' : 'development',
  entry: {
    [name]: [
      'vue/dist/vue.esm.js',
      'axios',
      'vue-router',
      'vuex',
      'qs',
      'babel-polyfill'
    ]
  },
  output,
  plugins
}

const rmDir = path.join(dir, 'dll')
const rmFileName = isProd ? path.join(rmDir, `prod.${name}.dll.js`) : path.join(rmDir, `dev.${name}.dll.js`)

module.exports = new Promise((resolve, reject) => {
  rm(rmFileName, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('delete success!')
    resolve(dll)
  })
})
