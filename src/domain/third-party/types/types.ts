export type ThirdPartyDto = {
  vehiculePlate: string;
  name: string;
  document: string;
  phone: string;
  driverLicense: string;
};

export type CreateThirdPartyDto = {
  vehiculePlate: string;
  name: string;
  phone: string;
  document: string;
  driverLicense: string;
};

export type SearchThirdPartyDto = {
  vehiculePlate?: string;
  document?: string;
  phone?: string;
  driverLicense?: string;
};
