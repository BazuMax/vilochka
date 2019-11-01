import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  name: "default",
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "vilochka",
  password: process.env.DB_PASSWORD || "vilochka",
  database: process.env.DB_NAME || "vilochka",
  synchronize: false,
  dropSchema: false,
  logging: true,
  migrationsRun: true,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrationsTableName: "migration_table",
  migrations: [__dirname + "/migration/**/*{.ts,.js}", "migration/*.ts"],
  cli: {
    migrationsDir: "src/migration",
  },
};

export = config;
