import { Repository } from "typeorm";
import { Incidents } from "../../infra/db/entities/incidents/incidents.entity";

import { IncidentDto } from "./types/types";
import { ICustomerService } from "../customers/interface";
import { IIncidentService } from "./interface";
import { IThirdPartyService } from "../third-party/interface";
import { ThirdPartyDto } from "../third-party/types/types";
import { ThirdParty } from "../../infra/db/entities/third-party/third-party.entity";
import { IVehiculeService } from "../vehicules/interface";
import { Vehicules } from "../../infra/db/entities/vehicules/vehicules.entity";

export class IncidentService implements IIncidentService {
  private incidentRepository: Repository<Incidents>;
  private customerService: ICustomerService;
  private vehiculeService: IVehiculeService;
  private thirdPartyService: IThirdPartyService;

  constructor(
    incidentRepository: Repository<Incidents>,
    customerService: ICustomerService,
    vehiculeService: IVehiculeService,
    thirdPartyService: IThirdPartyService
  ) {
    this.incidentRepository = incidentRepository;
    this.customerService = customerService;
    this.vehiculeService = vehiculeService;
    this.thirdPartyService = thirdPartyService;
  }

  async findAll() {
    return this.incidentRepository.find();
  }

  async addIncidentEvent(incidentDto: IncidentDto): Promise<Incidents> {
    let newIncident = this.incidentRepository.create();

    const {
      address,
      customerDocument,
      date,
      policeReport,
      thirdPartyList,
      customerVehiculePlate,
    } = incidentDto;

    newIncident.vehiculesInvolved = [];

    const customer = await this.customerService.findOneBy({
      document: customerDocument,
    });

    const vehicule = await this.vehiculeService.findOneBy({
      plate: customerVehiculePlate,
    });

    newIncident.customerDocument = customerDocument;
    newIncident.address = address;

    if (vehicule) newIncident.vehiculesInvolved.push(vehicule);

    if (customer) newIncident.customers = customer;

    newIncident.date = date;
    newIncident.policeReport = policeReport;

    if (thirdPartyList.length) {
      const { processedThirdPartyList, allVehicules } =
        await this.embedThirdParty(thirdPartyList);

      newIncident.thirdParty = processedThirdPartyList;

      newIncident.vehiculesInvolved =
        newIncident.vehiculesInvolved.concat(allVehicules);
    }

    return this.incidentRepository.save(newIncident);
  }

  private async embedThirdParty(list: ThirdPartyDto[]): Promise<{
    processedThirdPartyList: ThirdParty[];
    allVehicules: Vehicules[];
  }> {
    const listProcessed: ThirdParty[] = [];
    let listVehiculesProcessed: Vehicules[] = [];

    for (const thirdPartyDto of list) {
      const party = await this.thirdPartyService.findOneBy({
        document: thirdPartyDto.document,
      });

      if (!party) {
        const newParty = await this.thirdPartyService.add(thirdPartyDto);

        listVehiculesProcessed = listVehiculesProcessed.concat(
          newParty.vehicules
        );

        listProcessed.push(newParty);
      } else {
        let vehicule = await this.vehiculeService.findOneBy({
          plate: thirdPartyDto.vehicule.plate,
        });

        if (!vehicule) {
          vehicule = await this.vehiculeService.addWithOwner(
            {
              ...thirdPartyDto.vehicule,
            },
            party
          );
        }

        listVehiculesProcessed.push(vehicule);

        listProcessed.push(party);
      }
    }

    return {
      processedThirdPartyList: listProcessed,
      allVehicules: listVehiculesProcessed,
    };
  }
}
