"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetAccessControlHeadersMiddleware = void 0;
const common_1 = require("@nestjs/common");
let SetAccessControlHeadersMiddleware = class SetAccessControlHeadersMiddleware {
    use(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    }
};
SetAccessControlHeadersMiddleware = __decorate([
    (0, common_1.Injectable)()
], SetAccessControlHeadersMiddleware);
exports.SetAccessControlHeadersMiddleware = SetAccessControlHeadersMiddleware;
//# sourceMappingURL=set-access-control-headers.middleware.js.map