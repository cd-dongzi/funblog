import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { BcryptService } from './bcrypt.service';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [BcryptService, LoggerService],
  exports: [BcryptService, LoggerService],
})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
