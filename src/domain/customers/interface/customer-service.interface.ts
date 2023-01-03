import { Customers } from "../../../infra/db/entities/customers/customers.entity";
import {
  CreateCustomerDto,
  CustomerSearchByDto,
  CustomerUpdateDto,
} from "../types/types";

export interface ICustomerService {
  findAll: () => Promise<Customers[]>;
  findOneBy: (input: CustomerSearchByDto) => Promise<Customers | null>;
  add: (createCustomerDto: CreateCustomerDto) => Promise<Customers>;
  modify: (
    customerId: number,
    customerUpdateDto: CustomerUpdateDto
  ) => Promise<Customers>;
}
