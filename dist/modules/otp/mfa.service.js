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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
const typeorm_2 = require("typeorm");
const nanoid_1 = require("nanoid");
const no_changes_exception_1 = require("../../exceptions/no-changes.exception");
const users_service_1 = require("../users/users.service");
const remember_mfa_validator_entity_1 = require("./remember-mfa-validator.entity");
const otp_not_found_exception_1 = require("../../exceptions/otp-not-found.exception");
const otp_not_valid_exception_1 = require("../../exceptions/otp-not-valid.exception");
const no_2fa_secret_exception_1 = require("../../exceptions/no-2fa-secret.exception");
const cookie_config_1 = require("../../config/cookie.config");
let MfaService = class MfaService {
    constructor(usersService, configService, validatorRepository) {
        this.usersService = usersService;
        this.configService = configService;
        this.validatorRepository = validatorRepository;
    }
    async validateMfa(req, otp, remember, res, user) {
        if (await this.validateRememberMfaCookie(req)) {
            this.setNewRememberMfaCookie(res, user);
            return true;
        }
        else {
            const otpValid = await this.validateOtp(otp, user);
            if (otpValid) {
                console.log('Remember2fa value in the request was set to', remember);
                if (remember === 'true') {
                    this.setNewRememberMfaCookie(res, user);
                }
                else {
                }
                return true;
            }
            return false;
        }
    }
    async validateOtp(otp, authenticatedUser) {
        console.log('Validating OTP', otp, '...');
        if (otp === null || otp == undefined) {
            console.log('No OTP found.');
            throw new otp_not_found_exception_1.OTPNotFoundException();
        }
        const user = await this.usersService.findById(authenticatedUser.id);
        console.log('The mfaSecret of', user.username, ' is', user.mfaSecret);
        const otpValid = otplib_1.authenticator.verify({
            token: otp,
            secret: user.mfaSecret
        });
        if (!otpValid) {
            console.log('One-time password not valid.');
            return false;
        }
        console.log('One-time password valid.');
        return true;
    }
    setNewRememberMfaCookie(res, user) {
        console.log('Setting new remember2fa cookie');
        const validator = new remember_mfa_validator_entity_1.RememberMfaValidatorEntity();
        const token = (0, nanoid_1.nanoid)(32);
        validator.token = token;
        validator.user = user;
        validator.expires = new Date(Date.now() + cookie_config_1.default.maxAge);
        this.validatorRepository.save(validator);
        res.cookie('remember2fa', token, cookie_config_1.default);
    }
    async validateRememberMfaCookie(req) {
        console.log('Looking for remember2fa cookie...');
        if (req.signedCookies['remember2fa']) {
            const cookieValue = req.signedCookies['remember2fa'];
            console.log('Remember2fa cookie value is', cookieValue);
            const validator = await this.validatorRepository.findOne({
                where: {
                    token: cookieValue,
                },
            });
            console.log('Validator for cookie value is', validator);
            if (validator && validator.expires >= new Date()) {
                console.log('Remember2fa cookie valid.');
                return true;
            }
            else {
                console.log('Remember2fa cookie invalid or expired.');
                return false;
            }
        }
        else {
            console.log('No remember2fa cookie found.');
            return false;
        }
    }
    async enableMfa(username, otp) {
        const user = await this.usersService.findByUsername(username);
        if (user.has2faEnabled) {
            console.log("Disabled");
            throw new no_changes_exception_1.NoChangesException('Two-factor authentication already enabled');
        }
        if (!user.mfaSecret) {
            throw new no_2fa_secret_exception_1.No2faSecretException();
        }
        if (!await this.validateOtp(otp, user)) {
            throw new otp_not_valid_exception_1.OTPNotValidException();
        }
        else {
            user.has2faEnabled = true;
            return this.usersService.save(user);
        }
    }
    async disableMfa(username, otp) {
        const user = await this.usersService.findByUsername(username);
        if (!user.has2faEnabled) {
            console.log("Disabled");
            throw new no_changes_exception_1.NoChangesException('Two-factor authentication already disabled');
        }
        if (!await this.validateOtp(otp, user)) {
            throw new otp_not_valid_exception_1.OTPNotValidException();
        }
        else {
            user.has2faEnabled = false;
            user.mfaSecret = null;
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
    __param(2, (0, typeorm_1.InjectRepository)(remember_mfa_validator_entity_1.RememberMfaValidatorEntity)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService,
        typeorm_2.Repository])
], MfaService);
exports.MfaService = MfaService;
//# sourceMappingURL=mfa.service.js.map