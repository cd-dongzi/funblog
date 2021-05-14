import webpack from 'webpack'
import ora from 'ora'
import getConfig from '@root/build/webpack'
import { logMsg } from './utils'

const [clientWebpackConfig, serverWebpackConfig, adminWebpackConfig] = getConfig(process.env.NODE_ENV as ENV)

export const build = async () => {
  const configList = []
  if (process.env.BUILD_ENV === 'admin') {
    configList.push(adminWebpackConfig)
  } else if (process.env.BUILD_ENV === 'client') {
    configList.push(clientWebpackConfig)
  } else if (process.env.BUILD_ENV === 'server') {
    configList.push(serverWebpackConfig)
  } else {
    configList.push(clientWebpackConfig, serverWebpackConfig, adminWebpackConfig)
  }
  const spinner = ora('building for ' + process.env.NODE_ENV + '...\n')
  spinner.start()

  webpack(configList, (err, stats) => {
    spinner.stop()
    if (err) {
      throw err
    }
    if (!err && stats) {
      stats.stats.forEach((s) => {
        if (s.hasErrors()) {
          const info = s.toJson()
          info.errors?.forEach((error) => {
            logMsg(error.message, 'error')
          })
          return
        }
        console.log(
          s.toString({
            ...(s.compilation.options.stats as AnyObject),
            timings: false
          })
        )
        logMsg(`Build ${s.compilation.name} complete.\nTime:${s.endTime - s.startTime}`, 'info', false)
      })
      return
    }
  })
}

build()
