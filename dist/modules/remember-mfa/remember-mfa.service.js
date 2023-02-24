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
exports.RememberMfaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nanoid_1 = require("nanoid");
const remember_mfa_validator_entity_1 = require("../remember-mfa/remember-mfa-validator.entity");
const cookie_config_1 = require("../../config/cookie.config");
let RememberMfaService = class RememberMfaService {
    constructor(validatorRepository) {
        this.validatorRepository = validatorRepository;
    }
    setNewRememberMfaCookie(res, user) {
        console.log('Setting new remember2fa cookie');
        const token = (0, nanoid_1.nanoid)(32);
        this.createRememberMfaValidator(token, user);
        res.cookie('remember2fa', token, cookie_config_1.default);
    }
    setClearRememberMfaCookie(res) {
        console.log('Set clear remember2fa cookie');
        res.clearCookie('remember2fa', cookie_config_1.default);
    }
    async createRememberMfaValidator(token, user) {
        const validator = new remember_mfa_validator_entity_1.RememberMfaValidatorEntity();
        validator.token = token;
        validator.user = user;
        validator.expires = new Date(Date.now() + cookie_config_1.default.maxAge);
        this.validatorRepository.save(validator);
    }
    async removeRememberMfaValidator(token) {
        this.validatorRepository.delete({ token: token });
    }
    async removeAllRememberMfaValidatorsForUser(user) {
        this.validatorRepository.delete({ user: user });
    }
    async isRememberMfaTokenValid(rememberMfaToken, user) {
        console.log('Remember2fa token value is', rememberMfaToken);
        const validator = await this.validatorRepository.findOne({
            where: {
                token: rememberMfaToken,
                user: user,
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
};
RememberMfaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(remember_mfa_validator_entity_1.RememberMfaValidatorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RememberMfaService);
exports.RememberMfaService = RememberMfaService;
//# sourceMappingURL=remember-mfa.service.js.map