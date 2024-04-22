import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SERVER_PORT } from './constants';
import { GlobalExceptionFilter } from './filters/globalExceptionFilter';
import { GlobalResponseInterceptor } from './interceptors/globalResponseInterceptor';
import { WebpGlobalMiddleware } from './middlewares/webp.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.use(WebpGlobalMiddleware());
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 原始类型的转换，如string转化为number
      whitelist: true, // 不会接受dto定义以外的属性
      forbidNonWhitelisted: true, // 如果传入dto定义以外的属性，服务端则会报400错
    }),
  );
  await app.listen(SERVER_PORT);
  console.log(
    `\nServer running at:
- Local:  http://localhost:${SERVER_PORT}`,
  );
}
bootstrap();
