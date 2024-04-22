import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { LOG_CONSOLE, LOG_DIR, LOG_FILE } from 'src/constants';
import { transports, format, createLogger, Logger, LoggerOptions } from 'winston';
import 'winston-daily-rotate-file';

interface ILoggerOptions {
  consoleLog?: boolean;
}

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    const options = {
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }), // 添加时间戳
        format.json(), // 使用 JSON 格式记录日志
        // format.prettyPrint(),
      ),
      // ...this.getLoggerOptions('info'),
    };
    this.logger = createLogger(options);

    if (LOG_CONSOLE) {
      this.logger.add(
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.colorize({
              all: true,
            }),
          ),
        }),
      );
    }
    if (LOG_FILE) {
      this.logger.add(this.createTransportFile('info'));
      this.logger.add(
        this.createTransportFile('error', {
          format: format.combine(format.prettyPrint(), format.errors({ stack: true })),
        }),
      );
    }
  }

  createTransportFile(level: string, options = {} as LoggerOptions) {
    return new transports.DailyRotateFile({
      level,
      dirname: `${LOG_DIR}/${this.getYMD()}`, // 存储日志的目录
      filename: `${level}-%DATE%.log`, // 日志文件名格式
      datePattern: 'YYYY-MM-DD', // 日期格式
      zippedArchive: true, // 将旧的日志压缩成归档文件
      maxSize: '20m', // 每个日志文件的最大大小
      maxFiles: '14d', // 最多保留几天的日志文件
      ...options,
    });
  }

  getYMD() {
    return dayjs(new Date()).format('YYYY-MM-DD');
  }

  getFormatArr(level: string) {
    const arr = [
      // format.timestamp({
      //   format: 'YYYY-MM-DD HH:mm:ss',
      // }), // 添加时间戳
      // format.json(), // 使用 JSON 格式记录日志
    ];
    if (level === 'error') {
      // arr.push(format.prettyPrint(), format.errors({ stack: true }));
    }
    return arr as any[];
  }

  getLoggerOptions(level: string, { consoleLog } = {} as ILoggerOptions): LoggerOptions {
    const disableLogFile = process.env.LOG === 'false';
    return {
      level,
      format: format.combine(...this.getFormatArr(level)),
      transports: [
        consoleLog && new transports.Console(),
        !disableLogFile &&
          new transports.DailyRotateFile({
            dirname: `logs/${this.getYMD()}`, // 存储日志的目录
            filename: `${level}-%DATE%.log`, // 日志文件名格式
            datePattern: 'YYYY-MM-DD', // 日期格式
            zippedArchive: true, // 将旧的日志压缩成归档文件
            maxSize: '20m', // 每个日志文件的最大大小
            maxFiles: '14d', // 最多保留几天的日志文件
          }),
      ].filter((v) => v) as any[],
    };
  }

  overrideOptions(options: LoggerOptions): void {
    this.logger.configure(options);
  }

  setLevel(level: string, options?: ILoggerOptions) {
    const loggerOptions = this.getLoggerOptions(level, options);
    this.overrideOptions(loggerOptions);
  }

  log(message: string) {
    // this.setLevel('info');
    this.logger.info(message);
  }

  error(message: string, trace: string, options = {} as Record<string, any>) {
    // this.setLevel('error', {
    //   consoleLog: true,
    // });
    this.logger.error({ message, trace, ...options });
  }

  warn(message: string) {
    // this.setLevel('warn');
    this.logger.warn(message);
  }

  // debug(message: string) {
  //   // this.setLevel('debug');
  //   this.logger.debug(message);
  // }
}
