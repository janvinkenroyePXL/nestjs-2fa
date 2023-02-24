import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { MfaService } from './mfa.service';
import { MfaController } from './mfa.controller';
import { OtpModule } from '../otp/otp.module';
import { RememberMfaModule } from '../remember-mfa/remember-mfa.module';


@Module({
  imports: [
    UsersModule,
    OtpModule,
    RememberMfaModule
  ],
  providers: [MfaService],
  exports: [MfaService],
  controllers: [MfaController],
})
export class MfaModule {}
