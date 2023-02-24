"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsConfig = {
    origin: ["https://localhost:3000"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
};
exports.default = corsConfig;
//# sourceMappingURL=cors.config.js.map