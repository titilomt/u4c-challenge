export type CreateVehiculeDto = {
  name: string;
  year: string;
  plate: string;
  brand: string;
  chassis: string;
};

export type FindVehiculeDto = {
  plate?: string;
  chassis?: string;
};
