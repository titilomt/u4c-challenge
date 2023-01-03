import { Repository } from "typeorm";
import { ICustomerService } from "../../../src/domain/customers/interface";
import {
  CreateCustomerDto,
  CustomerUpdateDto,
} from "../../../src/domain/customers/types/types";
import { IncidentService } from "../../../src/domain/incidents/service";
import { IThirdPartyService } from "../../../src/domain/third-party/interface";
import { CreateThirdPartyDto } from "../../../src/domain/third-party/types/types";
import { IVehiculeService } from "../../../src/domain/vehicules/interface";
import { CreateVehiculeDto } from "../../../src/domain/vehicules/types/types";
import { Customers } from "../../../src/infra/db/entities/customers/customers.entity";
import { Incidents } from "../../../src/infra/db/entities/incidents/incidents.entity";
import { ThirdParty } from "../../../src/infra/db/entities/third-party/third-party.entity";
import { Vehicules } from "../../../src/infra/db/entities/vehicules/vehicules.entity";
import { IncidentRepositoryMock } from "../../db/repositories/incidents/incidents.repository.mock";

const customerServiceSut: ICustomerService = {
  findAll: async () => {
    return [];
  },
  findOneBy: async (_obj: any) =>
    ({
      id: 1,
      name: "Test",
      document: "123456789",
      birth: new Date(),
      driverLicense: "1234",
      phone: "1234",
    } as Customers),
  add: async (createCustomerDto: CreateCustomerDto) => {
    return { ...createCustomerDto, id: 1, incidents: [], vehicules: [] };
  },
  modify: async (customerId: number, customerUpdateDto: CustomerUpdateDto) => {
    return {
      id: customerId,
      ...customerUpdateDto,
      incidents: [],
      vehicules: [],
    } as Customers;
  },
};

const thirdPartyServiceSut: IThirdPartyService = {
  findAll: async () => [],
  findOneBy: async (_obj: any) =>
    ({
      document: "123456",
      driverLicense: "123456778",
      name: "teste",
      vehiculePlate: "DSE1234",
      id: 1,
      incidents: [],
      phone: "123456567",
      vehicules: [],
    } as ThirdParty),
  add: async (thirdParty: CreateThirdPartyDto) => ({
    document: thirdParty.document,
    driverLicense: thirdParty.driverLicense,
    name: thirdParty.name,
    vehicules: [],
    phone: thirdParty.phone,
    id: 1,
    incidents: [],
  }),
};

const vehiculeServiceSut: IVehiculeService = {
  findOneBy: async (_input) => {
    return {
      brand: "",
      chassis: "",
      customer: null,
      id: 1,
      name: "",
      thirdParty: null,
      plate: "",
      year: "",
    } as unknown as Vehicules;
  },
  findAll: async () => [],
  add: async (createVehiculeDto: CreateVehiculeDto) =>
    ({ ...createVehiculeDto } as Vehicules),
  addWithOwner: async (
    createVehiculeDto: CreateVehiculeDto,
    owner: Customers | ThirdParty
  ) => ({ ...createVehiculeDto } as Vehicules),
  vehiculeFactory: (
    createVehiculeDto: CreateVehiculeDto,
    customer: Customers
  ) => ({ ...createVehiculeDto } as Vehicules),
};

describe("IncidentService", () => {
  const incidentRepo =
    new IncidentRepositoryMock() as unknown as Repository<Incidents>;
  const incidentService = new IncidentService(
    incidentRepo,
    customerServiceSut,
    vehiculeServiceSut,
    thirdPartyServiceSut
  );

  it("Deve adicionar um Incidente e retornar seus dados", async () => {
    const incident = await incidentService.addIncidentEvent({
      address: "RUA TESTE",
      customerDocument: "123456789",
      customerVehiculePlate: "TES1234",
      date: new Date(),
      policeReport: "xpto999999",
      thirdPartyList: [
        {
          document: "123456",
          driverLicense: "123456778",
          name: "teste",
          vehicule: {
            brand: "",
            chassis: "",
            name: "",
            plate: "",
            year: "",
          },
          phone: "031991144556677",
        },
      ],
    });

    expect(incident).toEqual(
      expect.objectContaining({
        id: 2,
      })
    );
  });
});
