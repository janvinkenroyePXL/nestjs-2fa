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
exports.MfaController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../../decorators/user.decorator");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const user_entity_1 = require("../users/user.entity");
const mfa_service_1 = require("./mfa.service");
let MfaController = class MfaController {
    constructor(mfaService) {
        this.mfaService = mfaService;
    }
    async generateQrDev(res, user) {
        const { otpauthUrl } = await this.mfaService.generateMfaSecret(user);
        return this.mfaService.pipeQrCodeStream(res, otpauthUrl);
    }
    async generateDev(user) {
        console.log("endpoint /mfa/generate accessed");
        return this.mfaService.generateMfaSecret(user);
    }
    async enableMfaDev(user, otp) {
        return this.mfaService.enableMfa(user, otp);
    }
    async disableMfaDev(res, user, otp) {
        return this.mfaService.disableMfa(user, otp, res);
    }
    async generate(user) {
        console.log("endpoint /2fa/generate accessed");
        return this.mfaService.generateMfaSecret(user);
    }
    async enableMfa(user, otp) {
        return this.mfaService.enableMfa(user, otp);
    }
    async disableMfa(res, user, otp) {
        return this.mfaService.disableMfa(user, otp, res);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/generate-qr'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "generateQrDev", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/generate'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "generateDev", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/enable'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "enableMfaDev", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/disable'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "disableMfaDev", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('organisations/:organisationId/users/:userId/2fa/generate'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "generate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('organisations/:organisationId/users/:userId/2fa/enable'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "enableMfa", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('organisations/:organisationId/users/:userId/2fa/disable'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "disableMfa", null);
MfaController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [mfa_service_1.MfaService])
], MfaController);
exports.MfaController = MfaController;
//# sourceMappingURL=mfa.controller.js.map