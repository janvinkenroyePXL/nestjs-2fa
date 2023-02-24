"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoChangesException = void 0;
const common_1 = require("@nestjs/common");
class NoChangesException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.OK);
    }
}
exports.NoChangesException = NoChangesException;
//# sourceMappingURL=no-changes.exception.js.map