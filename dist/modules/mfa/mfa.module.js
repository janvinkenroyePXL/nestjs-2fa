"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("../users/users.module");
const mfa_service_1 = require("./mfa.service");
const mfa_controller_1 = require("./mfa.controller");
const otp_module_1 = require("../otp/otp.module");
const remember_mfa_module_1 = require("../remember-mfa/remember-mfa.module");
let MfaModule = class MfaModule {
};
MfaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            otp_module_1.OtpModule,
            remember_mfa_module_1.RememberMfaModule
        ],
        providers: [mfa_service_1.MfaService],
        exports: [mfa_service_1.MfaService],
        controllers: [mfa_controller_1.MfaController],
    })
], MfaModule);
exports.MfaModule = MfaModule;
//# sourceMappingURL=mfa.module.js.map