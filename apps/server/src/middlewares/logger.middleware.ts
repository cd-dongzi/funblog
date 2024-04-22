import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/modules/shared/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl: url, ip: ipAddress } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const responseTime = Date.now() - start;

      const logMessage = `[${method}] ${url} - ${statusCode} ${statusMessage} - ${responseTime}ms - IP: ${ipAddress}`;
      this.logger.log(logMessage);
    });

    res.on('close', () => {
      if (!res.headersSent) {
        const responseTime = Date.now() - start;
        const logMessage = `[${method}] ${url} - Connection closed before response - ${responseTime}ms - IP: ${ipAddress}`;
        this.logger.warn(logMessage);
      }
    });

    next();
  }
}
