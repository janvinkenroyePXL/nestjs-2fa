"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cors_config_1 = require("./config/cors.config");
const https_config_1 = require("./config/https.config");
const app_module_1 = require("./modules/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: https_config_1.default,
    });
    app.enableCors(cors_config_1.default);
    await app.listen(8001);
}
bootstrap();
//# sourceMappingURL=main.js.map