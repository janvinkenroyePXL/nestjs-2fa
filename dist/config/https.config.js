"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const httpsConfig = {
    pfx: fs.readFileSync('secrets/localhost.pfx'),
    passphrase: '5057',
};
exports.default = httpsConfig;
//# sourceMappingURL=https.config.js.map