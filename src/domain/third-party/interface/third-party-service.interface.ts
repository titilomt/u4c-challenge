import { ThirdParty } from "../../../infra/db/entities/third-party/third-party.entity";

import { CreateThirdPartyDto, SearchThirdPartyDto } from "../types/types";

export interface IThirdPartyService {
  findAll: () => Promise<ThirdParty[]>;
  findOneBy: (inputSearch: SearchThirdPartyDto) => Promise<ThirdParty | null>;
  add: (input: CreateThirdPartyDto) => Promise<ThirdParty>;
}
