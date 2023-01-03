import { Repository } from "typeorm";
import { Customers } from "../../infra/db/entities/customers/customers.entity";
import { ThirdParty } from "../../infra/db/entities/third-party/third-party.entity";
import { Vehicules } from "../../infra/db/entities/vehicules/vehicules.entity";
import { IVehiculeService } from "./interface";
import { CreateVehiculeDto, FindVehiculeDto } from "./types/types";

export class VehiculeService implements IVehiculeService {
  private readonly vehiculesRepository: Repository<Vehicules>;

  constructor(vehiculesRepository: Repository<Vehicules>) {
    this.vehiculesRepository = vehiculesRepository;
  }

  async findOneBy(input: FindVehiculeDto): Promise<Vehicules | null> {
    return this.vehiculesRepository.findOneBy({ ...input });
  }

  async findAll(): Promise<Vehicules[]> {
    return this.vehiculesRepository.find();
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

  async addWithOwner(
    createVehiculeDto: CreateVehiculeDto,
    owner: Customers | ThirdParty
  ): Promise<Vehicules> {
    let own: { customer?: Customers; thirdParty?: ThirdParty } = {};

    if (owner instanceof Customers) {
      own.customer = owner;
    } else {
      own.thirdParty = owner;
    }

    const newVehicule = this.vehiculesRepository.create({
      brand: createVehiculeDto.brand,
      chassis: createVehiculeDto.chassis,
      name: createVehiculeDto.name,
      plate: createVehiculeDto.plate,
      year: createVehiculeDto.year,
      ...own,
    });

    return this.vehiculesRepository.save(newVehicule);
  }
}
