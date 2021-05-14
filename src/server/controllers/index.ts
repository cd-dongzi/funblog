import glob from 'glob'
import Utils from '@root/build/utils'
import { MetaData, ControllerOptions } from './type'
import { generateRoutes } from './utils'

export const metadata: MetaData = {
  controllers: {}
}

export const bootstrapControllers = (options: ControllerOptions) => {
  const { router, controllerPaths } = options
  // 引入文件, 进而触发装饰器绑定controllers
  controllerPaths.forEach((path) => {
    const files = glob.sync(Utils.resolve(`src/server/${path}`))
    files.forEach((file) => {
      require(file)
    })
    // 绑定router
    generateRoutes(router, metadata, options)
  })
}
