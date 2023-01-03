"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers = void 0;
const typeorm_1 = require("typeorm");
const incidents_entity_1 = require("../incidents/incidents.entity");
const vehicules_entity_1 = require("../vehicules/vehicules.entity");
let Customers = class Customers {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Customers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Customers.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Customers.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customers.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Customers.prototype, "driverLicense", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customers.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicules_entity_1.Vehicules, (vehicules) => vehicules.customer, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Customers.prototype, "vehicules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => incidents_entity_1.Incidents, (incidents) => incidents.customers, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Customers.prototype, "incidents", void 0);
Customers = __decorate([
    (0, typeorm_1.Entity)()
], Customers);
exports.Customers = Customers;
