"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotModifiedException = void 0;
const common_1 = require("@nestjs/common");
class NotModifiedException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.OK);
    }
}
exports.NotModifiedException = NotModifiedException;
//# sourceMappingURL=not-modified.exception.js.map