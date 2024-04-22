import { Injectable } from '@nestjs/common';
import { LoggerService } from './modules/shared/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  send() {
    return 'haha';
  }
}
