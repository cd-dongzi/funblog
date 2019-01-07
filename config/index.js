const path = require('path')
module.exports = {
    admin: {
        base: {
            path: path.resolve(__dirname, '../public/admin'),
            publicPath: '/admin/',
            assetsPath: 'static'
        },
        dev: {
            env: 'development',
            publicPath: '/',
            host: 'localhost',
            port: '8090',
            assetsSubDirectory: 'static',
            devtoolType: 'cheap-module-eval-source-map',
            proxyTable: {  //proxy代理
                '/admin_api': {
                    target: 'http://localhost:3000/api/admin',
                    changeOrigin: true,
                    pathRewrite: {
                      '^/admin_api': '/'
                    }
                }
            }
        },
        build: {
            env: 'production', // 当前环境
            publicPath: '/admin/', // html引用资源路径
            assetsPath: 'static', // 静态资源目录
            assetsSubDirectory: 'static', // html资源存放目录
            devtoolType: 'source-map' // 代码位置信息
        }
    },
    client: {
        base: {
            path: path.resolve(__dirname, '../public/client'),
            publicPath: '/client/',
            assetsPath: 'static'
        },
        dev: {
            env: 'development',
            publicPath: '/',
            assetsPath: 'static',
            assetsSubDirectory: 'static',
            devtoolType: 'cheap-module-eval-source-map',
            proxyTable: {
                '/client_api': {
                    target: 'http://localhost:3000/api/client',
                    changeOrigin: true,
                    pathRewrite: {
                      '^/client_api': '/'
                    }
                }
            }
        },
        build: {
            env: 'production',
            publicPath: '/client/',
            assetsPath: 'static',
            assetsSubDirectory: 'static',
            devtoolType: 'source-map'
        } 
    }  
}