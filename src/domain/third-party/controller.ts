import { Request, ResponseToolkit } from "@hapi/hapi";
import { DataSource } from "typeorm";
import { ThirdParty } from "../../infra/db/entities/third-party/third-party.entity";

import { IThirdPartyService } from "./interface";
import { ThirdPartyService } from "./service";

export class ThirdPartyController {
  private readonly thirdPartyService: IThirdPartyService;

  constructor(connection: DataSource) {
    this.thirdPartyService = new ThirdPartyService(
      connection.getRepository(ThirdParty)
    );
  }

  async findAll(_request: Request, h: ResponseToolkit) {
    try {
      const thirdPartyList = await this.thirdPartyService.findAll();

      return h.response(thirdPartyList).code(200);
    } catch (err) {
      const error = err as Error;
      return h.response(error.message).code(500);
    }
  }
}
