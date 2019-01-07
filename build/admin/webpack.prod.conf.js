"use strict"
const path = require('path')
const webpack = require('webpack')
const styleLoader = require('./style-loader')
const prodConf = require('../../config').admin.build //生产环境配置参数
const baseConf = require('./webpack.base.conf') //webpack基本配置

//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require("webpack-merge")
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin")
//一个拷贝文件的webpack插件！
const CopyWebpackPlugin = require("copy-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = dir => path.join(__dirname, '../../', dir)

// 资源路径
const assetsPath = dir => path.posix.join(prodConf.assetsPath, dir)
const prod = merge({}, baseConf, {
    mode: 'production',
    output: {
        //文件名
        filename: assetsPath('js/[name].[chunkhash].min.js'),

        //用于打包require.ensure(代码分割)方法中引入的模块
        chunkFilename: assetsPath('js/[name].[chunkhash].js'),
        publicPath: prodConf.publicPath
    },
    module: {
        rules: styleLoader.styleLoader({
            extract: true,
            sourceMap: true
        })
    },

    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        //压缩js
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_console: true, // 打包后去除console.log
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
                    pure_funcs: ['console.log']
                }
            },
            sourceMap: prodConf.productionSourceMap,
            parallel: true // 使用多进程并行运行来提高构建速度
        }),

        //作用域提升,提升代码在浏览器执行速度
        new webpack.optimize.ModuleConcatenationPlugin(),

        //根据模块相对路径生成四位数hash值作为模块id
        new webpack.HashedModuleIdsPlugin(),

        //将整个文件复制到构建输出指定目录下
        new CopyWebpackPlugin([{
            from: resolve('static/admin'),
            to: prodConf.assetsPath,
            ignore: [".*"]
        }]),
        
        // html配置
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('code/admin/index.html'),
            favicon: resolve('static/admin/favicon.ico'),
            inject: true,
            //压缩配置
            // minify: {
            //     //删除Html注释
            //     // removeComments: true,
            //     //去除空格
            //     collapseWhitespace: true,
            //     //去除属性引号
            //     removeAttributeQuotes: true
            // },
        })
    ]
})


// 查看打包内容
if (process.env.analyz_config_report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prod.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prod