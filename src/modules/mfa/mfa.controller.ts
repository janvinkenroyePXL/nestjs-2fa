import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorators/user.decorator';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserEntity } from '../users/user.entity';
import { MfaService } from './mfa.service';

@Controller()
export class MfaController {
    constructor(private mfaService: MfaService) { }

    // Endpoint only for development (Postman)
    @UseGuards(JwtAuthGuard)
    @Post('mfa/generate-qr')
    async generateQrDev(@Res() res: any, @User() user: UserEntity) {
        const { otpauthUrl } = await this.mfaService.generateMfaSecret(user);
        return this.mfaService.pipeQrCodeStream(res, otpauthUrl);
    }

    // Endpoint only for development (Postman)
    @UseGuards(JwtAuthGuard)
    @Post('mfa/generate')
    async generateDev(@User() user: UserEntity) {
        console.log("endpoint /mfa/generate accessed");
        return this.mfaService.generateMfaSecret(user);
    }

    // Endpoint only for development (Postman)
    @UseGuards(JwtAuthGuard)
    @Post('mfa/enable')
    async enableMfaDev(@User() user: UserEntity, @Body('otp') otp: string) {
        return this.mfaService.enableMfa(user, otp);
    }

    // Endpoint only for development (Postman)
    @UseGuards(JwtAuthGuard)
    @Post('mfa/disable')
    async disableMfaDev(@Res({ passthrough: true }) res: Response,
        @User() user: UserEntity,
        @Body('otp') otp: string) {
        return this.mfaService.disableMfa(user, otp, res);
    }

    @UseGuards(JwtAuthGuard)
    @Post('organisations/:organisationId/users/:userId/2fa/generate')
    async generate(@User() user: UserEntity) {
        console.log("endpoint /2fa/generate accessed");
        return this.mfaService.generateMfaSecret(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('organisations/:organisationId/users/:userId/2fa/enable')
    @HttpCode(200)
    async enableMfa(@User() user: UserEntity, @Body('otp') otp: string) {
        return this.mfaService.enableMfa(user, otp);
    }

    @UseGuards(JwtAuthGuard)
    @Post('organisations/:organisationId/users/:userId/2fa/disable')
    @HttpCode(200)
    async disableMfa(@Res({ passthrough: true }) res: Response,
        @User() user: UserEntity,
        @Body('otp') otp: string) {
        return this.mfaService.disableMfa(user, otp, res);
    }

}
