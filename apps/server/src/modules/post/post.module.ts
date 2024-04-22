import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostPublicController } from './post.public.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController, PostPublicController],
  providers: [PostService],
})
export class PostModule {}
