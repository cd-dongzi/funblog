import { Module, forwardRef } from '@nestjs/common';
import { AppConfigService } from './appConfig.service';
import { EmailModule } from '../email/email.module';
import { SiteModule } from '../site/site.module';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
  imports: [forwardRef(() => SiteModule), EmailModule],
})
export class AppConfigModule {}
