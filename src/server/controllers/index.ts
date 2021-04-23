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
      /* 
        通过别名引入文件
        Why?
        因为直接webpack打包引用变量无法找到模块
        因为webpack打包出来的文件都得到打包出来的引用路径里面去找，并不是实际路径(__webpack_require__)
        所以直接引入路径会有问题。用别名引入。
        有个问题还待解决，就是他会解析字符串拼接的那个路径下面的所有文件
        例如： require(`@root/src/server/controllers${fileName}`) 会解析@root/src/server/controllers下的所有文件，
        目前定位在这个文件下可以防止解析过多的文件导致node内存不够，
        这个问题待解决，谨记
      */
      const p = Utils.resolve('src/server/controllers')
      const fileName = file.replace(p, '')
      require(`@root/src/server/controllers${fileName}`)
    })

    // 绑定router
    generateRoutes(router, metadata, options)
  })
}
