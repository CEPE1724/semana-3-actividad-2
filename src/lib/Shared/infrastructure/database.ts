import { Options, Sequelize } from "sequelize";
import { env } from "./env";

const options: Options = {
  dialect: env.dbDialect,
  logging: env.nodeEnv === "development" ? console.log : false
};

if (env.dbDialect === "sqlite") {
  options.storage = env.dbStorage;
} else {
  options.host = env.dbHost;
  options.port = env.dbPort;
}

export const sequelize =
  env.dbDialect === "sqlite"
    ? new Sequelize(options)
    : new Sequelize(env.dbName, env.dbUser, env.dbPassword, options);

export async function connectDatabase(): Promise<void> {
  await sequelize.authenticate();
  console.log(`Base de datos conectada (${env.dbDialect})`);
}
