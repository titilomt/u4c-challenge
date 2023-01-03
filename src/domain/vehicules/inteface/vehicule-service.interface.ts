import { Customers } from "../../../infra/db/entities/customers/customers.entity";
import { Vehicules } from "../../../infra/db/entities/vehicules/vehicules.entity";
import { CreateVehiculeDto } from "../types/types";

export interface IVehiculeService {
  add: (createVehiculeDto: CreateVehiculeDto) => Promise<Vehicules>;
  vehiculeFactory: (
    createVehiculeDto: CreateVehiculeDto,
    customer: Customers
  ) => Vehicules;
}
