import log4js from 'log4js'
import serverConfig from '@server/config'
import dayjs from 'dayjs'

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark'
export interface LogOptions {
  logLevel: LogLevel
  dir: string
}

export type LoggerContext = Record<LogLevel, (message: any) => void>
export interface Logger {
  http: LoggerContext
  api: LoggerContext
  external: LoggerContext
}

const createLogger = (options = {} as LogOptions): Logger => {
  const opts = {
    ...serverConfig.log,
    ...options
  }
  log4js.configure({
    appenders: {
      stdout: {
        type: 'stdout'
      },
      multi: { type: 'multiFile', base: opts.dir, property: 'dir', extension: '.log' }
    },
    categories: {
      default: { appenders: ['stdout'], level: 'off' },
      http: { appenders: ['multi'], level: opts.logLevel },
      api: { appenders: ['multi'], level: opts.logLevel },
      external: { appenders: ['multi'], level: opts.logLevel }
    }
  })
  const create = (appender: string) => {
    const methods: LogLevel[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
    const context = {} as LoggerContext
    // const logger = log4js.getLogger(serverConfig.isProd ? appender : 'default')
    const logger = log4js.getLogger(appender)
    methods.forEach((method) => {
      context[method] = (message: string) => {
        logger.addContext('dir', `/${appender}/${method}/${dayjs().format('YYYY-MM-DD')}`)
        logger[method](message)
      }
    })
    return context
  }
  return {
    http: create('http'),
    api: create('api'),
    external: create('external')
  }
}
export default createLogger
