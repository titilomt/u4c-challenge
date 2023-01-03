import { Repository } from "typeorm";
import { IncidentService } from "../../../src/domain/incidents/service";
import { CreateThirdPartyDto } from "../../../src/domain/third-party/types/types";
import { Customers } from "../../../src/infra/db/entities/customers/customers.entity";
import { Incidents } from "../../../src/infra/db/entities/incidents/incidents.entity";
import { ThirdParty } from "../../../src/infra/db/entities/third-party/third-party.entity";
import { IncidentRepositoryMock } from "../../db/repositories/incidents/incidents.repository.mock";

const customerServiceSut = {
  findOneBy: async (_obj: any) =>
    ({
      id: 1,
      name: "Test",
      document: "123456789",
      birth: new Date(),
      driverLicense: "1234",
      phone: "1234",
    } as Customers),
};

const thirdPartyServiceSut = {
  findOneBy: async (_obj: any) =>
    ({
      document: "123456",
      driverLicense: "123456778",
      name: "teste",
      vehiculePlate: "DSE1234",
      id: 1,
      incidents: [],
      phone: "123456567",
    } as ThirdParty),
  add: async (thirdParty: CreateThirdPartyDto) => ({
    document: thirdParty.document,
    driverLicense: thirdParty.driverLicense,
    name: thirdParty.name,
    vehiculePlate: thirdParty.vehiculePlate,
    phone: thirdParty.phone,
    id: 1,
    incidents: [],
  }),
};

describe("IncidentService", () => {
  const incidentRepo = new IncidentRepositoryMock() as Repository<Incidents>;
  const incidentService = new IncidentService(
    incidentRepo,
    customerServiceSut,
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
          vehiculePlate: "DSE1234",
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
