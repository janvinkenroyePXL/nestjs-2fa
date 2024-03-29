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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mfa_service_1 = require("../mfa/mfa.service");
let AuthService = class AuthService {
    constructor(jwtService, mfaService) {
        this.jwtService = jwtService;
        this.mfaService = mfaService;
    }
    async login(user, remember2faToken, otp, remember2fa, res) {
        console.log('Trying to login user', user.username, '...');
        if (user.has2faEnabled) {
            console.log(user.username, 'has 2FA enabled');
            await this.mfaService.validateMfa(user, remember2faToken, otp, remember2fa, res);
        }
        else {
            console.log('2FA is not enabled for', user.username);
        }
        const payloadJwt = { username: user.username, sub: user.id };
        console.log('A Jwt token will be created and sent back. The token has the following payload:', payloadJwt);
        const { password, mfaSecret, roles } = user, userProperties = __rest(user, ["password", "mfaSecret", "roles"]);
        const userPayload = Object.assign(Object.assign({}, userProperties), { roles: roles.map(role => role.name) });
        console.log('The userpayload is:', userPayload);
        return {
            hash: this.jwtService.sign(payloadJwt),
            user: userPayload,
            success: true,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mfa_service_1.MfaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map