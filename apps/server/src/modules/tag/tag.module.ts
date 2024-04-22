import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagPublicController } from './tag.public.controller';
import { TagService } from './tag.service';

@Module({
  controllers: [TagController, TagPublicController],
  providers: [TagService],
})
export class TagModule {}
