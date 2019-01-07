/**
 * 第一种
 * configure方法为配置log4js对象，内部有levels、appenders、categories三个属性
 * levels:
 *         配置日志的输出级别,共ALL<TRACE<DEBUG<INFO<WARN<ERROR<FATAL<MARK<OFF八个级别,default level is OFF
 *         只有大于等于日志配置级别的信息才能输出出来，可以通过category来有效的控制日志输出级别
 * appenders:
 *         配置文件的输出源，一般日志输出type共有console、file、dateFile三种
 *         console:普通的控制台输出
 *         file:输出到文件内，以文件名-文件大小-备份文件个数的形式rolling生成文件
 *         dateFile:输出到文件内，以pattern属性的时间格式，以时间的生成文件
 * replaceConsole:
 *         是否替换控制台输出，当代码出现console.log，表示以日志type=console的形式输出
 *                 
 */

/**
 * 第二种
 * appenders:
 *         一个JS对象，key为上面的category，value是一些其他属性值
 * categories：
 *         default表示log4js.getLogger()获取找不到对应的category时，使用default中的日志配置
 *     
 */

import log4js from 'log4js'
import access from './access'
import config from 'config'

const methods = ["all", "trace", "debug", "info", "warn", "error", "fatal", "mark", 'off']
// 提取默认公用参数对象
const baseInfo = config.log

export default (options = {}) => {
  const appenders = {}
  const opts = Object.assign({}, baseInfo, options)
  const {
    logLevel, // 级别
    dir, // 目录
    ip, // IP
    projectName // 项目名字
  } = opts
  //存储公用的日志信息
  const commonInfo = {
    projectName,
    ip
  }

  appenders.cheese = {
    type: 'dateFile',
    filename: `${dir}/task/`, //日志文件名，可以设置相对路径或绝对路径 
    pattern: 'task-yyyy-MM-dd.log', //占位符，紧跟在filename后面  
    alwaysIncludePattern: true //是否总是有后缀名     
  }
  appenders.all = {
    type: 'dateFile',
    filename: `${dir}/all/`,
    pattern: 'task-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  }

  // 环境变量为dev local development 认为是开发环境
  // if (config.app.env === "dev" || config.app.env === "development") {
  //     appenders.out = {
  //         type: "console"
  //     }
  // }

  const logConfig = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: logLevel
      }
    }
  }
  const contextLogger = {} //错误日志等级对象，最后会赋值给ctx上，用于打印各种日志
  const logger = log4js.getLogger('cheese');
  return async (ctx, next) => {
    const start = Date.now() // 记录请求开始的时间
    methods.forEach((method, i) => {
      contextLogger[method] = message => {
        logConfig.appenders.cheese = {
          type: 'dateFile',
          filename: `${dir}/${method}/`, //日志文件名，可以设置相对路径或绝对路径 
          pattern: `${method}-yyyy-MM-dd.log`, //占位符，紧跟在filename后面  
          alwaysIncludePattern: true //是否总是有后缀名   
        }
        // logConfig.appenders.cheese.filename = `${dir}/${method}/`
        // logConfig.appenders.cheese.pattern = `${method}-yyyy-MM-dd.log`
        log4js.configure(logConfig)
        logger[method](access(ctx, message, commonInfo))
      }
    })
    ctx.log = contextLogger

    await next()

    const end = Date.now() - start
    ctx.log.info(access(ctx, {
      responseTime: `响应时间为${end/1000}s`
    }, commonInfo))
  }
}