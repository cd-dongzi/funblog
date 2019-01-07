
require('babel-core/register') 
const path = require('path')
const name = require(path.resolve(__dirname, './manifest.json')).name
const {put, putStream} = require('../../code/server/utils/oss/ali-oss')

const isProd = process.env.NODE_ENV === 'production'

let fileName = `javascript/dll/${isProd ? 'prod' : 'dev'}.${name}.dll.js`,
    filePath = path.resolve(__dirname, `../../static/client/js/dll/${isProd ? 'prod' : 'dev'}.${name}.dll.js`)
put(fileName, filePath, (url) => {
    console.log('上传完成: ' + url)
})