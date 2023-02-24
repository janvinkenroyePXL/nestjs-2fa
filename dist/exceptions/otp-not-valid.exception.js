"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPNotValidException = void 0;
const common_1 = require("@nestjs/common");
class OTPNotValidException extends common_1.HttpException {
    constructor() {
        super('One-time password not valid', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.OTPNotValidException = OTPNotValidException;
//# sourceMappingURL=otp-not-valid.exception.js.map