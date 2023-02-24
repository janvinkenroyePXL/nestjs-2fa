"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieExpiredException = void 0;
const common_1 = require("@nestjs/common");
class CookieExpiredException extends common_1.HttpException {
    constructor() {
        super('The cookie has expired', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.CookieExpiredException = CookieExpiredException;
//# sourceMappingURL=otp-not-valid.exception%20copy.js.map