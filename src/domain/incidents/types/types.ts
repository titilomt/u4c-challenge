import { Customers } from "../../../infra/db/entities/customers/customers.entity";
import { ThirdParty } from "../../../infra/db/entities/third-party/third-party.entity";
import { ThirdPartyDto } from "../../third-party/types/types";

export type IncidentDto = {
  date: Date;
  address: string;
  customerVehiculePlate: string;
  customerDocument: string;
  policeReport: string;
  thirdPartyList: ThirdPartyDto[];
};

export type Incident = {
  id: number;
  date?: Date;
  address: string;
  customerVehiculePlate: string;
  customerDocument: string;
  policeReport: string;
  thirdPartyList?: ThirdParty[];
  customer?: Customers;
};
