import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentPublicController } from './comment.public.controller';
import { CommentService } from './comment.service';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [CommentController, CommentPublicController],
  providers: [CommentService],
  imports: [EmailModule],
})
export class CommentModule {}
