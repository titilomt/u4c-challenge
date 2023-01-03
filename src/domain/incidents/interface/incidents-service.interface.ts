import { Incidents } from "../../../infra/db/entities/incidents/incidents.entity";
import { IncidentDto } from "../types/types";

export interface IIncidentService {
  addIncidentEvent: (input: IncidentDto) => Promise<Incidents | null>;
}
