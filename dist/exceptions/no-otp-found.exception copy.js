"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoOTPFoundException = void 0;
const common_1 = require("@nestjs/common");
class NoOTPFoundException extends common_1.HttpException {
    constructor(error) {
        super(error, common_1.HttpStatus.ACCEPTED);
    }
}
exports.NoOTPFoundException = NoOTPFoundException;
//# sourceMappingURL=no-otp-found.exception%20copy.js.map