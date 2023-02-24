"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.No2faSecretException = void 0;
const common_1 = require("@nestjs/common");
class No2faSecretException extends common_1.HttpException {
    constructor() {
        super('No mfa secret found on the server', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.No2faSecretException = No2faSecretException;
//# sourceMappingURL=no-2fa-secret.exception.js.map