import { Module } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitPublicController } from './init.public.controller';
import { InitService } from './init.service';

@Module({
  controllers: [InitController, InitPublicController],
  providers: [InitService],
})
export class InitModule {}
