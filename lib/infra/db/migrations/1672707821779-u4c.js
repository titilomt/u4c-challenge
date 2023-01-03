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
exports.u4c1672707821779 = void 0;
class u4c1672707821779 {
    constructor() {
        this.name = 'u4c1672707821779';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "third_party" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "document" character varying NOT NULL, "phone" character varying NOT NULL, "driverLicense" character varying NOT NULL, CONSTRAINT "UQ_f97337f4af0b270947f10e6ad22" UNIQUE ("document"), CONSTRAINT "UQ_7b7c2c925d28ef75b27724fe9ed" UNIQUE ("driverLicense"), CONSTRAINT "PK_a9b4c282f25d91ea8a5493929df" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "incidents" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "customerDocument" character varying NOT NULL, "customerVehiculePlate" character varying NOT NULL, "policeReport" character varying NOT NULL, "customersId" integer, CONSTRAINT "UQ_2c64ccb889ded1020a9ce46e395" UNIQUE ("policeReport"), CONSTRAINT "PK_ccb34c01719889017e2246469f9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "vehicules" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "year" character varying NOT NULL, "plate" character varying NOT NULL, "brand" character varying NOT NULL, "chassis" character varying NOT NULL, "customerId" integer, CONSTRAINT "UQ_f49671b924a0be1589bfcbb7396" UNIQUE ("chassis"), CONSTRAINT "PK_ba3a47ea8be2150ea0533653b26" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "birth" TIMESTAMP, "document" character varying NOT NULL, "name" character varying NOT NULL, "driverLicense" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_68c9c024a07c49ad6a2072d23c6" UNIQUE ("document"), CONSTRAINT "UQ_c9700d0923edaa1a86dfa93a5f9" UNIQUE ("driverLicense"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "incidents_third_party_third_party" ("incidentsId" integer NOT NULL, "thirdPartyId" integer NOT NULL, CONSTRAINT "PK_6d070f53ddf22e9624bb07b2168" PRIMARY KEY ("incidentsId", "thirdPartyId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_1ef7142c78174fcc5824cbc641" ON "incidents_third_party_third_party" ("incidentsId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_64009e79b02c4501aa3674aaf5" ON "incidents_third_party_third_party" ("thirdPartyId") `);
            yield queryRunner.query(`ALTER TABLE "incidents" ADD CONSTRAINT "FK_e025c730fff2c4fa1675bba725b" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "vehicules" ADD CONSTRAINT "FK_a856e8886643e08210006515aaa" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "incidents_third_party_third_party" ADD CONSTRAINT "FK_1ef7142c78174fcc5824cbc6412" FOREIGN KEY ("incidentsId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "incidents_third_party_third_party" ADD CONSTRAINT "FK_64009e79b02c4501aa3674aaf5e" FOREIGN KEY ("thirdPartyId") REFERENCES "third_party"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "incidents_third_party_third_party" DROP CONSTRAINT "FK_64009e79b02c4501aa3674aaf5e"`);
            yield queryRunner.query(`ALTER TABLE "incidents_third_party_third_party" DROP CONSTRAINT "FK_1ef7142c78174fcc5824cbc6412"`);
            yield queryRunner.query(`ALTER TABLE "vehicules" DROP CONSTRAINT "FK_a856e8886643e08210006515aaa"`);
            yield queryRunner.query(`ALTER TABLE "incidents" DROP CONSTRAINT "FK_e025c730fff2c4fa1675bba725b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_64009e79b02c4501aa3674aaf5"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_1ef7142c78174fcc5824cbc641"`);
            yield queryRunner.query(`DROP TABLE "incidents_third_party_third_party"`);
            yield queryRunner.query(`DROP TABLE "customers"`);
            yield queryRunner.query(`DROP TABLE "vehicules"`);
            yield queryRunner.query(`DROP TABLE "incidents"`);
            yield queryRunner.query(`DROP TABLE "third_party"`);
        });
    }
}
exports.u4c1672707821779 = u4c1672707821779;
