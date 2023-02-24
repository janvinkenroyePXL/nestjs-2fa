"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormConfig = {
    type: "postgres",
    host: "localhost",
    port: 9001,
    username: "jan",
    password: "edcbhu",
    database: "2fa-nest",
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/src/migrations/**/*{.ts,.js}"],
    synchronize: true,
    cli: {
        migrationsDir: 'src/migrations'
    }
};
exports.default = ormConfig;
//# sourceMappingURL=orm.config.js.map