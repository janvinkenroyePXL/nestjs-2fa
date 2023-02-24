"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class OTPNotFoundException extends common_1.HttpException {
    constructor() {
        super('One-time password not provided', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.OTPNotFoundException = OTPNotFoundException;
//# sourceMappingURL=otp-not-found.exception.js.map