import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GlobalConfigModule } from '../globalConfig/globalConfig.module';
import { GlobalConfigService } from '../globalConfig/globalConfig.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule, GlobalConfigModule],
      inject: [ConfigService, GlobalConfigService],
      useFactory: async (configService: ConfigService, globalService: GlobalConfigService) => {
        const siteAdvance = await globalService.getSiteAdvanceConfig();
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: `${siteAdvance?.tokenExpiresIn || configService.get<number>('jwt.expiresIn')}d`,
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
