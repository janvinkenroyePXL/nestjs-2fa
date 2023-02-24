"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class UsernameAlreadyExistsException extends common_1.HttpException {
    constructor() {
        super('Username already exists', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.UsernameAlreadyExistsException = UsernameAlreadyExistsException;
//# sourceMappingURL=username-already-exists.exception.js.map