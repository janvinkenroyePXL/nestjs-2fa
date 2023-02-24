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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const mfa_service_1 = require("./mfa.service");
let MfaController = class MfaController {
    constructor(mfaService) {
        this.mfaService = mfaService;
    }
    async generateQr(res, req) {
        const { otpauthUrl } = await this.mfaService.generateMfaSecret(req.user);
        return this.mfaService.pipeQrCodeStream(res, otpauthUrl);
    }
    async generate(req) {
        console.log("endpoint /mfa/generate accessed");
        return this.mfaService.generateMfaSecret(req.user);
    }
    async enableMfa(req, otp) {
        return this.mfaService.enableMfa(req.user.username, otp);
    }
    async disableMfa(req, otp) {
        var _a;
        return this.mfaService.disableMfa((_a = req.user) === null || _a === void 0 ? void 0 : _a.username, otp);
    }
    async generate2(req) {
        console.log("endpoint /2fa/generate accessed");
        return this.mfaService.generateMfaSecret(req.user);
    }
    async enableMfa2(req, otp) {
        return this.mfaService.enableMfa(req.user.username, otp);
    }
    async disableMfa2(req, otp) {
        var _a;
        return this.mfaService.disableMfa((_a = req.user) === null || _a === void 0 ? void 0 : _a.username, otp);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/generate-qr'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "generateQr", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/generate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "generate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/enable'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "enableMfa", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('mfa/disable'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "disableMfa", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('organisations/:organisationId/users/:userId/2fa/generate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "generate2", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('organisations/:organisationId/users/:userId/2fa/enable'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "enableMfa2", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('organisations/:organisationId/users/:userId/2fa/disable'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MfaController.prototype, "disableMfa2", null);
MfaController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof mfa_service_1.MfaService !== "undefined" && mfa_service_1.MfaService) === "function" ? _a : Object])
], MfaController);
exports.MfaController = MfaController;
//# sourceMappingURL=otp.controller.js.map