import { Module } from '@nestjs/common';
import { SvgController } from './svg.controller';
import { SvgPublicController } from './svg.public.controller';
import { SvgService } from './svg.service';

@Module({
  controllers: [SvgController, SvgPublicController],
  providers: [SvgService],
})
export class SvgModule {}
