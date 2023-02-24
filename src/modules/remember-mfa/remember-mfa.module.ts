import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RememberMfaValidatorEntity } from './remember-mfa-validator.entity';
import { RememberMfaService } from './remember-mfa.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([RememberMfaValidatorEntity])

  ],
  providers: [RememberMfaService],
  exports: [RememberMfaService],
})
export class RememberMfaModule {}