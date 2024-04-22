import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PagePublicController } from './page.public.controller';
import { PageService } from './page.service';

@Module({
  controllers: [PageController, PagePublicController],
  providers: [PageService],
})
export class PageModule {}
