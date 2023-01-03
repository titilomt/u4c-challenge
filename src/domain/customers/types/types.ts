import { CreateVehiculeDto } from "../../vehicules/types/types";

export type CreateCustomerDto = {
  document: string;
  name: string;
  driverLicense: string;
  birth: Date;
  phone: string;
  vehicules: CreateVehiculeDto[];
};

export type CustomerUpdateDto = {
  document?: string;
  name?: string;
  driverLicense?: string;
  birth?: Date;
  phone?: string;
};

export type CustomerSearchByDto = {
  document?: string;
  name?: string;
  driverLicense?: string;
  phone?: string;
};
