import { Request, ResponseToolkit } from "@hapi/hapi";

import { ICustomerService } from "./interface";
import { CustomerService } from "./service";
import { Customers } from "../../infra/db/entities/customers/customers.entity";
import { CreateCustomerDto, CustomerUpdateDto } from "./types/types";
import { DataSource } from "typeorm";

export class CustomerController {
  private readonly customerService: ICustomerService;

  constructor(connection: DataSource) {
    this.customerService = new CustomerService(
      connection.getRepository(Customers)
    );
  }

  async findAll(_request: Request, h: ResponseToolkit) {
    try {
      const customers = await this.customerService.findAll();

      return h.response(customers).code(200);
    } catch (err) {
      const error = err as Error;
      return h.response(error.message).code(500);
    }
  }

  async create(request: Request, h: ResponseToolkit) {
    const createCustomerDto: CreateCustomerDto = <CreateCustomerDto>(
      request.payload
    );

    try {
      const customer = await this.customerService.add(createCustomerDto);

      return h.response(customer).code(201);
    } catch (err) {
      const error = err as Error;
      return h.response(error.message).code(500);
    }
  }

  async updateCustomer(request: Request, h: ResponseToolkit) {
    const id = request.params["id"];

    const customerUpdateDto: CustomerUpdateDto = <CustomerUpdateDto>(
      request.payload
    );

    try {
      await this.customerService.modify(parseInt(id), customerUpdateDto);

      return h.response().code(204);
    } catch (err) {}
  }
}
