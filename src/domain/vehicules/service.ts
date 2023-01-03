import { Repository } from "typeorm";
import { Customers } from "../../infra/db/entities/customers/customers.entity";
import { Vehicules } from "../../infra/db/entities/vehicules/vehicules.entity";
import { IVehiculeService } from "./inteface";
import { CreateVehiculeDto } from "./types/types";

export class VehiculeService implements IVehiculeService {
  private readonly vehiculesRepository: Repository<Vehicules>;

  constructor(vehiculesRepository: Repository<Vehicules>) {
    this.vehiculesRepository = vehiculesRepository;
  }

  vehiculeFactory(
    createVehiculeDto: CreateVehiculeDto,
    customer: Customers
  ): Vehicules {
    return this.vehiculesRepository.create({
      brand: createVehiculeDto.brand,
      chassis: createVehiculeDto.chassis,
      customer: customer,
      name: createVehiculeDto.name,
      plate: createVehiculeDto.plate,
      year: createVehiculeDto.year,
    });
  }

  async add(createVehiculeDto: CreateVehiculeDto): Promise<Vehicules> {
    const newVehicule = this.vehiculesRepository.create(createVehiculeDto);

    return this.vehiculesRepository.save(newVehicule);
  }
}
