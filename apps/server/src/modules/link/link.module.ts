import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkPublicController } from './link.public.controller';
import { LinkService } from './link.service';

@Module({
  controllers: [LinkController, LinkPublicController],
  providers: [LinkService],
})
export class LinkModule {}
