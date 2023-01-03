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
exports.Incidents = void 0;
const typeorm_1 = require("typeorm");
const customers_entity_1 = require("../customers/customers.entity");
const third_party_entity_1 = require("../third-party/third-party.entity");
let Incidents = class Incidents {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Incidents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Incidents.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Incidents.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Incidents.prototype, "customerDocument", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Incidents.prototype, "customerVehiculePlate", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Incidents.prototype, "policeReport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customers_entity_1.Customers, (customers) => customers.incidents),
    __metadata("design:type", customers_entity_1.Customers)
], Incidents.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => third_party_entity_1.ThirdParty, (thirdParty) => thirdParty.incidents),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Incidents.prototype, "thirdParty", void 0);
Incidents = __decorate([
    (0, typeorm_1.Entity)()
], Incidents);
exports.Incidents = Incidents;
