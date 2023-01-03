import { DataSource } from "typeorm";

import { conf } from "./config";

export class Database {
  private AppDataSource: DataSource | null;

  constructor() {
    this.AppDataSource = null;
  }

  public async getConnection(): Promise<DataSource> {
    if (!this.AppDataSource) {
      this.AppDataSource = new DataSource({
        name: conf.DB_NAME,
        type: "postgres",
        host: conf.DB_HOST,
        port: Number(conf.DB_PORT),
        username: conf.DB_USER,
        password: conf.DB_PASSWORD,
        database: conf.DB_NAME,
        synchronize: false,
        entities: [__dirname + "/../db/entities/**/*.entity.{js,ts}"],
        migrations: [__dirname + "/../db/migrations/"],
        logging: false,
      });

      this.AppDataSource.initialize()
        .then(() => {
          console.log("Data Source has been initialized!");
        })
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
        });

      return this.AppDataSource;
    }

    return this.AppDataSource;
  }

  public async closeConnection() {
    if (this.AppDataSource?.isInitialized) {
      await this.AppDataSource.destroy();
    }
  }
}
