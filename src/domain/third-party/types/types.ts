import { CreateVehiculeDto } from "../../vehicules/types/types";

export type ThirdPartyDto = {
  vehicule: CreateVehiculeDto;
  name: string;
  document: string;
  phone: string;
  driverLicense: string;
};

export type CreateThirdPartyDto = {
  vehicule: CreateVehiculeDto;
  name: string;
  phone: string;
  document: string;
  driverLicense: string;
};

export type SearchThirdPartyDto = {
  document?: string;
  phone?: string;
  driverLicense?: string;
};
