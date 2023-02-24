"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
const no_changes_exception_1 = require("../../exceptions/no-changes.exception");
const users_service_1 = require("../users/users.service");
const otp_not_valid_exception_1 = require("../../exceptions/otp-not-valid.exception");
const no_2fa_secret_exception_1 = require("../../exceptions/no-2fa-secret.exception");
const otp_service_1 = require("../otp/otp.service");
const remember_mfa_service_1 = require("../remember-mfa/remember-mfa.service");
const otp_not_found_exception_1 = require("../../exceptions/otp-not-found.exception");
let MfaService = class MfaService {
    constructor(usersService, configService, otpService, rememberMfaService) {
        this.usersService = usersService;
        this.configService = configService;
        this.otpService = otpService;
        this.rememberMfaService = rememberMfaService;
    }
    async validateMfa(user, remember2faToken, otp, remember2fa, res) {
        if (remember2faToken && await this.rememberMfaService.isRememberMfaTokenValid(remember2faToken, user)) {
            this.rememberMfaService.setNewRememberMfaCookie(res, user);
            this.rememberMfaService.removeRememberMfaValidator(remember2faToken);
            return;
        }
        ;
        if (!otp) {
            console.log('No OTP found.');
            throw new otp_not_found_exception_1.OTPNotFoundException();
        }
        else if (await this.otpService.isOtpValid(otp, user)) {
            console.log('Remember2fa value in the request was set to', remember2fa);
            if (remember2fa === 'true') {
                this.rememberMfaService.setNewRememberMfaCookie(res, user);
            }
            return;
        }
        else {
            throw new otp_not_valid_exception_1.OTPNotValidException();
        }
    }
    async enableMfa(user, otp) {
        if (user.has2faEnabled) {
            console.log("Disabled");
            throw new no_changes_exception_1.NoChangesException('Two-factor authentication already enabled');
        }
        if (!user.mfaSecret) {
            throw new no_2fa_secret_exception_1.No2faSecretException();
        }
        if (!await this.otpService.isOtpValid(otp, user)) {
            throw new otp_not_valid_exception_1.OTPNotValidException();
        }
        else {
            user.has2faEnabled = true;
            return this.usersService.save(user);
        }
    }
    async disableMfa(user, otp, res) {
        if (!user.has2faEnabled) {
            console.log("Disabled");
            throw new no_changes_exception_1.NoChangesException('Two-factor authentication already disabled');
        }
        if (!await this.otpService.isOtpValid(otp, user)) {
            throw new otp_not_valid_exception_1.OTPNotValidException();
        }
        else {
            user.has2faEnabled = false;
            user.mfaSecret = null;
            this.rememberMfaService.removeAllRememberMfaValidatorsForUser(user);
            this.rememberMfaService.setClearRememberMfaCookie(res);
            return this.usersService.save(user);
        }
    }
    async setMfaSecret(secret, userId) {
        const user = await this.usersService.findById(userId);
        console.log("Setting secret", secret, "for user", user.username);
        user.mfaSecret = secret;
        return this.usersService.save(user);
    }
    async generateMfaSecret(userIdentifier) {
        const user = await this.usersService.findById(userIdentifier.id);
        let secret = null;
        if (user.mfaSecret !== null && user.mfaSecret !== undefined && user.mfaSecret !== '') {
            console.log("User already has secret. Secret is", user.mfaSecret);
            secret = user.mfaSecret;
        }
        else {
            console.log("Generating secret for user", user.username);
            secret = otplib_1.authenticator.generateSecret();
            console.log("Generated secret is", secret);
            await this.setMfaSecret(secret, user.id);
        }
        const otpauthUrl = otplib_1.authenticator.keyuri(user.username, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
        return {
            otpauthUrl
        };
    }
    async pipeQrCodeStream(stream, otpauthUrl) {
        return (0, qrcode_1.toFileStream)(stream, otpauthUrl);
    }
};
MfaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService,
        otp_service_1.OtpService,
        remember_mfa_service_1.RememberMfaService])
], MfaService);
exports.MfaService = MfaService;
//# sourceMappingURL=mfa.service.js.map