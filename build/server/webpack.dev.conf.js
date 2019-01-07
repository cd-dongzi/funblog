"use strict"
const path = require('path')
const webpack = require('webpack')
const styleLoader = require('./style-loader')
const devConf = require('../../config').client.dev  //开发环境配置参数
const baseConf = require('./webpack.base.conf') //webpack基本配置

// dll 配置
const { prefix } = require('../../code/server/utils/oss/ali-oss')

//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require("webpack-merge")
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin")
//一个编译提示的webpack插件！
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
//发送系统通知的一个node模块！
const notifier = require("node-notifier")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const resolve = dir => path.join(__dirname, '../../', dir)

// const SentryPlugin = require('@sentry/webpack-plugin')
// const gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim()

const dev = merge(baseConf, {
    mode: 'development',
    module: {
        rules: styleLoader.styleLoader({ extract: false, sourceMap: true })
    },

    //生成sourceMaps(方便调试)
    devtool: devConf.devtoolType,

    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),

        //显示模块相对路径
        new webpack.NamedModulesPlugin(),

        //将整个文件复制到构建输出指定目录下
        new CopyWebpackPlugin([{
            from: resolve('static/client'),
            to: devConf.assetsPath,
            ignore: [".*"]
        }]),

        //配置html入口信息
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('code/client/index.html'),
            inject: true,
            dll: (function(){
                let name = require(path.resolve(__dirname, './manifest.json')).name
                // return `${prefix}javascript/dll/dev.${name}.dll.js`
                return 'http://wintermelon.oss-cn-hangzhou.aliyuncs.com/javascript/dll/dev.lib.dll.js'
            })()
        }),

        //编译提示插件
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running.`],
            },
            onErrors: function (severity, errors) {
                if (severity !== "error") {
                    return
                }
                const error = errors[0]
                const filename = error.file.split("!").pop()
                //编译出错时,右下角弹出错误提示！
                notifier.notify({
                    title: "blog",
                    message: severity + ": " + error.name,
                    subtitle: filename || ""
                })
            }
        }),

        
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        //     // 'process.env.RELEASE_VERSION': JSON.stringify(gitSha)
        // }),

        // new SentryPlugin({
        //     include: './dist',
        //     release: '2.2.2',
        //     configFile: 'sentry.properties',
        //     // urlPrefix: '~/TechPage/', // 如果不需要也可以不传这个参
        // })
    ]
})

module.exports = dev