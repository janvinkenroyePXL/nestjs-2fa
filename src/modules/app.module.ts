import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CookieParserMiddleware } from 'src/middleware/cookieparser.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MfaModule } from './mfa/mfa.module';
import { UsersModule } from './users/users.module';
import ormConfig from 'src/config/orm.config';


@Module({
  imports: [AuthModule,
    UsersModule,
    MfaModule,
    TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot(
      { isGlobal: true, }
    ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieParserMiddleware)
      .forRoutes('login', 'disable', 'organisations/:organisationId/users/:userId/2fa/disable');
  }
}
