import { Repository } from "typeorm";
import { ThirdParty } from "../../infra/db/entities/third-party/third-party.entity";
import { IThirdPartyService } from "./interface";
import { CreateThirdPartyDto, SearchThirdPartyDto } from "./types/types";

export class ThirdPartyService implements IThirdPartyService {
  private readonly thirdPartyRepository: Repository<ThirdParty>;

  constructor(thirdPartyRepository: Repository<ThirdParty>) {
    this.thirdPartyRepository = thirdPartyRepository;
  }

  async findOneBy(
    inputSearch: SearchThirdPartyDto
  ): Promise<ThirdParty | null> {
    return this.thirdPartyRepository.findOneBy({ ...inputSearch });
  }

  async add(input: CreateThirdPartyDto): Promise<ThirdParty> {
    const newThirdParty = this.thirdPartyRepository.create(input);

    return this.thirdPartyRepository.save(newThirdParty);
  }
}
