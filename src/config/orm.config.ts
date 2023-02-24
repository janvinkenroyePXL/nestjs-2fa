import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

const ormConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 9001,
  username: "jan",
  password: "edcbhu",
  database: "2fa-nest",
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/src/migrations/**/*{.ts,.js}"],
  synchronize: true, // should be false in production
  cli: {
    migrationsDir: 'src/migrations'
  }
}

export default ormConfig;