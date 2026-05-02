import dotenv from "dotenv";

dotenv.config();

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toNumber(process.env.PORT, 3000),
  dbDialect: (process.env.DB_DIALECT ?? "sqlite") as "sqlite" | "mysql" | "postgres",
  dbStorage: process.env.DB_STORAGE ?? "./database.sqlite",
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: toNumber(process.env.DB_PORT, 3306),
  dbName: process.env.DB_NAME ?? "semana_3",
  dbUser: process.env.DB_USER ?? "root",
  dbPassword: process.env.DB_PASSWORD ?? ""
};
