import { Repository } from "typeorm";
import { CustomerService } from "../../../src/domain/customers/service";
import { Customers } from "../../../src/infra/db/entities/customers/customers.entity";
import { CustomerRepositoryMock } from "../../db/repositories/customers/customer.repository.mock";
import { IncidentRepositoryMock } from "../../db/repositories/incidents/incidents.repository.mock";

describe("CustomerService", () => {
  const customerRepositoryMock =
    new CustomerRepositoryMock() as Repository<Customers>;

  it("Deve adicionar um cliente e retornar seus dados.", async () => {
    const customerService = new CustomerService(customerRepositoryMock);

    const newCustomer = await customerService.add({
      name: "Teste",
      document: "12345656788",
      birth: new Date("1990-01-01"),
      driverLicense: "9922453282",
      phone: "0055031999998888",
      vehicules: [],
    });

    expect(newCustomer).toEqual(
      expect.objectContaining({
        name: "Teste",
      })
    );
  });

  it("Deve atualizar os dados de um cliente e retornar seu novo valor.", async () => {
    const customerService = new CustomerService(customerRepositoryMock);

    const newCustomer = await customerService.modify(1, {
      name: "Teste 2",
      document: "12345656788",
      driverLicense: "9922453282",
      phone: "0055031999998888",
    });

    expect(newCustomer).toEqual(
      expect.objectContaining({
        name: "Teste 2",
      })
    );
  });

  it("Deve criar um cliente que foi envolvido em um acidente, sem perder seu vinculo em incidentes.", async () => {
    const customerService = new CustomerService(customerRepositoryMock);
    const incidentRepo = new IncidentRepositoryMock();

    const newCustomer = await customerService.add({
      name: "Teste 3",
      document: "999999999999",
      birth: new Date("1990-01-01"),
      driverLicense: "9922453282",
      phone: "0055031999998888",
      vehicules: [],
    });

    const [incidentCustomer] = await incidentRepo.find({
      where: { document: newCustomer.document },
    });

    expect(incidentCustomer).toEqual(
      expect.objectContaining({
        id: 1,
      })
    );
  });
});
