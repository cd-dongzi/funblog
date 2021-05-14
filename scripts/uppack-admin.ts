import webpack from 'webpack'
import getConfig from '@root/build/webpack'
import WebpackDevServer from 'webpack-dev-server'
import rootConfig from '@root/src/shared/config'
import serverConfig from '@server/config'
import ip from 'ip'
import chalk from 'chalk'

const [, , adminWebpackConfig] = getConfig(process.env.NODE_ENV as ENV)

// 构建后台管理端界面
const start = async () => {
  const compiler = webpack(adminWebpackConfig)
  const port = rootConfig.app.server.adminPort
  const host = '0.0.0.0'
  const server = new WebpackDevServer(compiler, {
    https: rootConfig.isHttps ? serverConfig.httpsOptions : false,
    staticOptions: rootConfig.staticFilesOptions,
    stats: 'none',
    proxy: {
      '/admin_api': {
        target: `${rootConfig.scheme}://${rootConfig.app.server.host}:${rootConfig.app.server.port}`,
        secure: false,
        pathRewrite: { '^/admin_api': '/api/admin' }
      }
    }
  })
  server.listen(port, host, () => {
    console.log(
      `\nAdmin server running at:
  - Local:   ${chalk.cyan(`${rootConfig.scheme}://localhost:${port}`)}
  - Network: ${chalk.cyan(`${rootConfig.scheme}://${ip.address()}:${port}`)}`
    )
  })
}

start()
