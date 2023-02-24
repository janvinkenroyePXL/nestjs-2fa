"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieConfig = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};
exports.default = cookieConfig;
//# sourceMappingURL=cors.config%20copy.js.map