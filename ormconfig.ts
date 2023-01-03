import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export default new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_LOCAL_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: false,
  logging: true,
  entities: ["./src/infra/db/entities/**/*.ts"],
  migrations: ["./src/infra/db/migrations/*.ts"],
});
