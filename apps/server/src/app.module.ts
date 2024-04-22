import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Configuration from './config/configuration';
import { STATIC_DIR } from './constants';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { AppConfigModule } from './modules/appConfig/appConfig.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { EmailModule } from './modules/email/email.module';
import { ImageModule } from './modules/image/image.module';
import { InitModule } from './modules/init/init.module';
import { InvitationCodeModule } from './modules/invitationCode/invitationCode.module';
import { LinkModule } from './modules/link/link.module';
import { MongodbModule } from './modules/mongodb/mongodb.module';
import { PageModule } from './modules/page/page.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PostModule } from './modules/post/post.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RoleModule } from './modules/role/role.module';
import { SharedModule } from './modules/shared/shared.module';
import { SiteModule } from './modules/site/site.module';
import { SvgModule } from './modules/svg/svg.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { VisitorModule } from './modules/visitor/visitor.module';
// import { WechatyModule } from './modules/wechaty/wechaty.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: STATIC_DIR,
    }),
    NestConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [Configuration],
    }),
    AppConfigModule,
    SharedModule,
    PrismaModule,
    EmailModule,
    EmailModule,
    PermissionModule,
    ImageModule,
    RoleModule,
    UserModule,
    VisitorModule,
    InvitationCodeModule,
    AuthModule,
    SiteModule,
    PostModule,
    TagModule,
    CategoryModule,
    CommentModule,
    PageModule,
    LinkModule,
    SvgModule,
    MongodbModule,
    InitModule,
    // WechatyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
