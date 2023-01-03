import { CustomerDto } from "../../../../src/domain/customers/types/types";
import { ThirdPartyDto } from "../../../../src/domain/third-party/types/types";
import { Customers } from "../../../../src/infra/db/entities/customers/customers.entity";
import { ThirdParty } from "../../../../src/infra/db/entities/third-party/third-party.entity";
import { ThirdPartyData } from "./third-pary.mock";

export class ThirdPartyRepositoryMock {
  constructor() {}

  async save(input: ThirdPartyDto): Promise<ThirdParty> {
    const { id } = ThirdPartyData[ThirdPartyData.length - 1];

    const newThirdParty = {
      id: id + 1,
      name: input.name,
      document: input.document,
      driverLicense: input.driverLicense,
      phone: input.phone,
      incidents: [],
    };

    ThirdPartyData.push(newThirdParty);

    return newThirdParty;
  }

  create(input: ThirdPartyDto | undefined): ThirdParty {
    const { id } = ThirdPartyData[ThirdPartyData.length - 1];

    return {
      id: id + 1,
      name: input?.name || "",
      document: input?.document || "",
      driverLicense: input?.document || "",
      phone: input?.phone || "",
      incidents: [],
    };
  }
}
