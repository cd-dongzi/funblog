import { Module } from '@nestjs/common';
import { VisitorController } from './visitor.controller';
import { VisitorPublicController } from './visitor.public.controller';
import { VisitorService } from './visitor.service';

@Module({
  controllers: [VisitorController, VisitorPublicController],
  providers: [VisitorService],
})
export class VisitorModule {}
