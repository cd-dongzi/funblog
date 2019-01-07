"use strict"
const path = require('path')
const webpack = require('webpack')
const styleLoader = require('./style-loader')
const devConf = require('../../config').admin.dev  //开发环境配置参数
const baseConf = require('./webpack.base.conf') //webpack基本配置

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
const dev = merge(baseConf, {
    mode: 'development',
    output: {
        publicPath: devConf.publicPath
    },
    module: {
        rules: styleLoader.styleLoader({ extract: false, sourceMap: true })
    },

    //生成sourceMaps(方便调试)
    devtool: devConf.devtoolType,

    //启动一个express服务器,使我们可以在本地进行开发！！！
    devServer: {
        hot: true, // 热加载
        inline: true, //自动刷新
        open: false, //自动打开浏览器
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        host: devConf.host, //主机名
        port: devConf.port, //端口号
        proxy: devConf.proxyTable, //配置反向代理解决跨域
        compress: true, //为你的代码进行压缩。加快开发流程和优化的作用
        overlay: { // 在浏览器上全屏显示编译的errors或warnings。
            errors: true,
            warnings: false
        },
        quiet: true // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    },

    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),

        //显示模块相对路径
        new webpack.NamedModulesPlugin(),

        //将整个文件复制到构建输出指定目录下
        new CopyWebpackPlugin([{
            from: resolve('static/admin'),
            to: devConf.assetsPath,
            ignore: [".*"]
        }]),

        //配置html入口信息
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('code/admin/index.html'),
            inject: true
        }),

        //编译提示插件, webpack4 警告错误
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running. ${devConf.host}:${devConf.port}`],
            },
            onErrors: function (severity, errors) {
                if (severity !== "error") {
                    return
                }
                const error = errors[0]
                const filename = error.file.split("!").pop()
                // console.log(filename)
                //编译出错时,右下角弹出错误提示！
                notifier.notify({
                    title: "blog",
                    message: severity + ": " + error.name,
                    subtitle: filename || ""
                })
            }
        })


    ]
})

module.exports = dev