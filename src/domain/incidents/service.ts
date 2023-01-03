import { Repository } from "typeorm";
import { Incidents } from "../../infra/db/entities/incidents/incidents.entity";

import { IncidentDto } from "./types/types";
import { ICustomerService } from "../customers/interface";
import { IIncidentService } from "./interface";
import { IThirdPartyService } from "../third-party/interface";
import { ThirdPartyDto } from "../third-party/types/types";
import { ThirdParty } from "../../infra/db/entities/third-party/third-party.entity";

export class IncidentService implements IIncidentService {
  private incidentRepository: Repository<Incidents>;
  private customerService: ICustomerService;
  private thirdPartyService: IThirdPartyService;

  constructor(
    incidentRepository: Repository<Incidents>,
    customerService: ICustomerService,
    thirdPartyService: IThirdPartyService
  ) {
    this.incidentRepository = incidentRepository;
    this.customerService = customerService;
    this.thirdPartyService = thirdPartyService;
  }

  private async embedThirdParty(list: ThirdPartyDto[]): Promise<ThirdParty[]> {
    const listProcessed: ThirdParty[] = [];

    for (const thirdPartyDto of list) {
      const party = await this.thirdPartyService.findOneBy({
        document: thirdPartyDto.document,
      });

      if (!party) {
        const newParty = await this.thirdPartyService.add(thirdPartyDto);

        listProcessed.push(newParty);
      } else {
        listProcessed.push(party);
      }
    }

    return listProcessed;
  }

  async addIncidentEvent(incidentDto: IncidentDto): Promise<Incidents> {
    let newIncident = this.incidentRepository.create();

    const {
      address,
      customerVehiculePlate,
      customerDocument,
      date,
      policeReport,
      thirdPartyList,
    } = incidentDto;

    const customer = await this.customerService.findOneBy({
      document: customerDocument,
    });

    newIncident.address = address;
    newIncident.customerDocument = customerDocument;

    if (customer) newIncident.customers = customer;

    newIncident.customerVehiculePlate = customerVehiculePlate;
    newIncident.date = date;
    newIncident.policeReport = policeReport;

    if (thirdPartyList.length) {
      const processedthirdPartyList = await this.embedThirdParty(
        thirdPartyList
      );

      newIncident.thirdParty = processedthirdPartyList;
    }

    return this.incidentRepository.save(newIncident);
  }
}
