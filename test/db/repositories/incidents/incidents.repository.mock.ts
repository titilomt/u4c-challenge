import { Incident } from "../../../../src/domain/incidents/types/types";
import { IncidentsData } from "./incidents.mock";

export class IncidentRepositoryMock {
  constructor() {}

  async find(query?: any) {
    if (query) {
      return IncidentsData.filter(
        (incident) =>
          incident.thirdParty.find(
            (third) => third.document === query.where.document
          ) != null
      );
    }

    return IncidentsData;
  }

  async save(incident: Incident): Promise<Incident> {
    return incident;
  }

  create(incident: Incident): Incident {
    const { id } = IncidentsData[IncidentsData.length - 1];

    return incident || { id: id + 1 };
  }
}
