"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotModifiedException = void 0;
const common_1 = require("@nestjs/common");
class NotModifiedException extends common_1.HttpException {
    constructor(error) {
        super(error, common_1.HttpStatus.NOT_MODIFIED);
    }
}
exports.NotModifiedException = NotModifiedException;
//# sourceMappingURL=not-modified.exception%20copy.js.map