import { Module } from '@nestjs/common';
import { WechatyController } from './wechaty.controller';
import { WechatyService } from './wechaty.service';

@Module({
  controllers: [WechatyController],
  providers: [WechatyService],
  exports: [WechatyService],
})
export class WechatyModule {}
