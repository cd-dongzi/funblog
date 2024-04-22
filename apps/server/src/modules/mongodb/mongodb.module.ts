import { Module } from '@nestjs/common';
import { MongodbController } from './mongodb.controller';
import { MongodbService } from './mongodb.service';

@Module({
  controllers: [MongodbController],
  providers: [MongodbService],
})
export class MongodbModule {}
