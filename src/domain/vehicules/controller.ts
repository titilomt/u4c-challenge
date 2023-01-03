import { Request, ResponseToolkit } from "@hapi/hapi";
import { DataSource } from "typeorm";
import { Vehicules } from "../../infra/db/entities/vehicules/vehicules.entity";

import { IVehiculeService } from "./interface";
import { VehiculeService } from "./service";

export class VehiculeController {
  private readonly vehiculeService: IVehiculeService;

  constructor(connection: DataSource) {
    this.vehiculeService = new VehiculeService(
      connection.getRepository(Vehicules)
    );
  }

  async findAll(_request: Request, h: ResponseToolkit) {
    try {
      const vehicules = await this.vehiculeService.findAll();

      return h.response(vehicules).code(200);
    } catch (err) {
      const error = err as Error;
      return h.response(error.message).code(500);
    }
  }
}
