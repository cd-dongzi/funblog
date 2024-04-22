import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { Public } from './decorators/public';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health-check')
  healthCheck() {
    return 'ok';
  }

  @Get('send')
  send(@Req() req: Request) {
    console.log(111, req.headers['user-agent'] || '');
    return this.appService.send();
  }
}
