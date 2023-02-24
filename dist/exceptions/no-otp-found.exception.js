"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class OTPNotFoundException extends common_1.HttpException {
    constructor() {
        super('One-time password not found', common_1.HttpStatus.ACCEPTED);
    }
}
exports.OTPNotFoundException = OTPNotFoundException;
//# sourceMappingURL=no-otp-found.exception.js.map