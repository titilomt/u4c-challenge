import {
  CreateCustomerDto,
  CustomerSearchByDto,
  CustomerUpdateDto,
} from "./types/types";

import { ICustomerService } from "./interface";
import { Repository } from "typeorm";
import { Customers } from "../../infra/db/entities/customers/customers.entity";

export class CustomerService implements ICustomerService {
  private customerRepository: Repository<Customers>;

  constructor(customerRepository: Repository<Customers>) {
    this.customerRepository = customerRepository;
  }

  async findOneBy(input: CustomerSearchByDto) {
    return this.customerRepository.findOneBy({ ...input });
  }

  async findAll(): Promise<Customers[]> {
    return this.customerRepository.find();
  }

  async add(customer: CreateCustomerDto): Promise<Customers> {
    const newCustomer = this.customerRepository.create(customer);

    return this.customerRepository.save(newCustomer);
  }

  async modify(
    customerId: number,
    customerUpdateDto: CustomerUpdateDto
  ): Promise<Customers> {
    const targetCustomer = await this.customerRepository.save({
      id: customerId,
      ...customerUpdateDto,
    });

    return targetCustomer;
  }
}
