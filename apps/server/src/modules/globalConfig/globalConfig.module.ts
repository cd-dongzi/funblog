import { Module } from '@nestjs/common';
import { GlobalConfigService } from './globalConfig.service';

@Module({
  providers: [GlobalConfigService],
  exports: [GlobalConfigService],
})
export class GlobalConfigModule {}
