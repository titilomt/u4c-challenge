"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
class Database {
    constructor() {
        this.AppDataSource = null;
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.AppDataSource) {
                this.AppDataSource = new typeorm_1.DataSource({
                    name: config_1.conf.DB_NAME,
                    type: "postgres",
                    host: config_1.conf.DB_HOST,
                    port: Number(config_1.conf.DB_PORT),
                    username: config_1.conf.DB_USER,
                    password: config_1.conf.DB_PASSWORD,
                    database: config_1.conf.DB_NAME,
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
        });
    }
    closeConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.AppDataSource) === null || _a === void 0 ? void 0 : _a.isInitialized) {
                yield this.AppDataSource.destroy();
            }
        });
    }
}
exports.Database = Database;
