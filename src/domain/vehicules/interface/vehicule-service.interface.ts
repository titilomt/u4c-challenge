import { Customers } from "../../../infra/db/entities/customers/customers.entity";
import { ThirdParty } from "../../../infra/db/entities/third-party/third-party.entity";
import { Vehicules } from "../../../infra/db/entities/vehicules/vehicules.entity";
import { CreateVehiculeDto, FindVehiculeDto } from "../types/types";

export interface IVehiculeService {
  findOneBy(input: FindVehiculeDto): Promise<Vehicules | null>;
  findAll: () => Promise<Vehicules[]>;
  add: (createVehiculeDto: CreateVehiculeDto) => Promise<Vehicules>;
  addWithOwner: (
    createVehiculeDto: CreateVehiculeDto,
    owner: Customers | ThirdParty
  ) => Promise<Vehicules>;
  vehiculeFactory: (
    createVehiculeDto: CreateVehiculeDto,
    customer: Customers
  ) => Vehicules;
}
