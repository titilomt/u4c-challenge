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
exports.VehiculeService = void 0;
class VehiculeService {
    constructor(vehiculesRepository) {
        this.vehiculesRepository = vehiculesRepository;
    }
    vehiculeFactory(createVehiculeDto, customer) {
        return this.vehiculesRepository.create({
            brand: createVehiculeDto.brand,
            chassis: createVehiculeDto.chassis,
            customer: customer,
            name: createVehiculeDto.name,
            plate: createVehiculeDto.plate,
            year: createVehiculeDto.year,
        });
    }
    add(createVehiculeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVehicule = this.vehiculesRepository.create(createVehiculeDto);
            return this.vehiculesRepository.save(newVehicule);
        });
    }
}
exports.VehiculeService = VehiculeService;
