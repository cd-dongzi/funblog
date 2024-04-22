import { Module, forwardRef } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
import { GlobalConfigModule } from '../globalConfig/globalConfig.module';

@Module({
  imports: [forwardRef(() => AuthModule), EmailModule, GlobalConfigModule],
  controllers: [UserController, UserAuthController],
  providers: [UserService, UserAuthService],
  exports: [UserService],
})
export class UserModule {}
