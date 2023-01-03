import { Request, ResponseToolkit } from "@hapi/hapi";

import { IIncidentService } from "./interface";
import { IncidentService } from "./service";
import { Incidents } from "../../infra/db/entities/incidents/incidents.entity";
import { IncidentDto } from "./types/types";
import { DataSource } from "typeorm";
import { ICustomerService } from "../customers/interface";
import { IThirdPartyService } from "../third-party/interface";
import { IVehiculeService } from "../vehicules/interface";

export class IncidentController {
  private readonly incidentService: IIncidentService;

  constructor(
    connection: DataSource,
    customerService: ICustomerService,
    vehiculeService: IVehiculeService,
    thirdPartyService: IThirdPartyService
  ) {
    this.incidentService = new IncidentService(
      connection.getRepository(Incidents),
      customerService,
      vehiculeService,
      thirdPartyService
    );
  }

  async findAll(_request: Request, h: ResponseToolkit) {
    try {
      const incidents = await this.incidentService.findAll();

      return h.response(incidents).code(200);
    } catch (err) {
      const error = err as Error;
      return h.response(error.message).code(500);
    }
  }

  async create(request: Request, h: ResponseToolkit) {
    const createIncidentDto: IncidentDto = <IncidentDto>request.payload;

    try {
      const incident = await this.incidentService.addIncidentEvent(
        createIncidentDto
      );

      return h.response(incident).code(201);
    } catch (err) {
      const error = err as Error;
      return h.response(error.message).code(500);
    }
  }
}
