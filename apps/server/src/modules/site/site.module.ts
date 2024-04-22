import { Module, forwardRef } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SitePublicController } from './site.public.controller';
import { SiteService } from './site.service';
import { AppConfigModule } from '../appConfig/appConfig.module';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [forwardRef(() => AppConfigModule), HttpModule],
  controllers: [SiteController, SitePublicController],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
