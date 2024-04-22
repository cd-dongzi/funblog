import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ApiException } from 'src/exceptions/api-exception';
import { LoggerService } from 'src/modules/shared/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  logger = new LoggerService();
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const extra = {
      url: request.url,
    };

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    if (exception instanceof ApiException) {
      this.logger.error(exception.message, exception.stack || '', extra);
      status = exception.getErrCode();
      response.status(exception.getStatus()).json({
        message: exception.message,
        data: null,
        code: exception.getErrCode(),
      });
      return;
    } else if (exception instanceof HttpException) {
      const response = exception.getResponse();
      status = exception.getStatus();
      message = (response as any).message ?? response;
      if (Array.isArray(message)) {
        message = message[0] || '';
      }
      this.logger.error(message, exception.stack || '', extra);
    } else if (exception instanceof Error) {
      // 检查异常的类型并设置相应的状态码和错误消息
      status = (exception as any).statusCode || HttpStatus.BAD_REQUEST;
      message = exception.message;
      this.logger.error(exception.message, exception.stack || '', extra);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
