import { CreateCustomerDto } from "../../../../src/domain/customers/types/types";
import { Customers } from "../../../../src/infra/db/entities/customers/customers.entity";
import { CustomerData } from "./customers.mock";
import { VehiculesData } from "./vehicules.mock";

export class CustomerRepositoryMock {
  constructor() {}

  async save(customer: CreateCustomerDto): Promise<Customers> {
    const { id } = CustomerData[CustomerData.length - 1];
    let vehicules: any = [];

    if (customer?.vehicules?.length) {
      const v = VehiculesData[VehiculesData.length - 1];

      let currId = v.id;

      for (const vehicule of customer.vehicules) {
        vehicules.push({
          id: currId + 1,
          ...vehicule,
        });

        currId += 1;
      }
    }

    const newCustomer = {
      id: id + 1,
      birth: customer.birth,
      document: customer.document,
      name: customer.name,
      driverLicense: customer.document,
      phone: customer.phone,
      vehicules,
      incidents: [],
    };

    CustomerData.push(newCustomer);

    return newCustomer;
  }

  create(customer: CreateCustomerDto | undefined): Customers {
    const { id } = CustomerData[CustomerData.length - 1];
    let vehicules: any = [];

    if (customer?.vehicules.length) {
      const v = VehiculesData[VehiculesData.length - 1];

      let currId = v.id;

      for (const vehicule of customer.vehicules) {
        vehicules.push({
          id: currId + 1,
          ...vehicule,
        });

        currId += 1;
      }
    }

    return {
      id: id + 1,
      birth: customer?.birth || new Date(),
      document: customer?.document || "",
      name: customer?.name || "",
      driverLicense: customer?.document || "",
      phone: customer?.phone || "",
      vehicules,
      incidents: [],
    };
  }
}
