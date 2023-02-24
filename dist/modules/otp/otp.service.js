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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const users_service_1 = require("../users/users.service");
let OtpService = class OtpService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async isOtpValid(otp, user) {
        console.log('Validating OTP', otp, '...');
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
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map