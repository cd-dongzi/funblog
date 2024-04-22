import { Controller, Get } from '@nestjs/common';

import { Public } from 'src/decorators/public';
import { MongodbService } from './mongodb.service';

@Public()
@Controller('mongodb')
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService) {}

  @Get('test')
  test() {
    return this.mongodbService.test();
  }

  @Get('init')
  init() {
    return this.mongodbService.init();
  }

  @Get('start')
  start() {
    return this.mongodbService.start();
  }

  @Get('sync/comment')
  syncComment() {
    return this.mongodbService.syncComment();
  }

  @Get('tag')
  tag() {
    return this.mongodbService.tag();
  }

  @Get('post')
  post() {
    return this.mongodbService.post();
  }

  @Get('visitor')
  visitor() {
    return this.mongodbService.visitor();
  }

  @Get('user')
  user() {
    return this.mongodbService.user();
  }

  @Get('comment')
  comment() {
    return this.mongodbService.comment();
  }

  @Get('like')
  like() {
    return this.mongodbService.like();
  }

  @Get('link')
  link() {
    return this.mongodbService.link();
  }

  @Get('svg/sync')
  svgSync() {
    return this.mongodbService.svgSync();
  }

  @Get('svg/sync/local')
  svgSyncLocal() {
    return this.mongodbService.svgSyncLocal();
  }

  @Get('delete')
  delete() {
    return 'delete';
    // return this.mongodbService.delete();
  }
}
