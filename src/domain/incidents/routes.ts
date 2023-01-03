import { Server } from "@hapi/hapi";

import { IncidentController } from "./controller";
import { getConnection } from "../../main/db";

import { CustomerService } from "../customers/service";
import { ThirdPartyService } from "../third-party/service";
import { Customers } from "../../infra/db/entities/customers/customers.entity";
import { ThirdParty } from "../../infra/db/entities/third-party/third-party.entity";
import Joi from "joi";
import { Vehicules } from "../../infra/db/entities/vehicules/vehicules.entity";
import { VehiculeService } from "../vehicules/service";

export default async (server: Server) => {
  const conn = await getConnection();

  const customerService = new CustomerService(conn.getRepository(Customers));
  const vehiculeService = new VehiculeService(conn.getRepository(Vehicules));
  const thirdPartyService = new ThirdPartyService(
    conn.getRepository(ThirdParty)
  );

  const incidentController = new IncidentController(
    conn,
    customerService,
    vehiculeService,
    thirdPartyService
  );

  server.bind(incidentController);

  server.route({
    method: "GET",
    path: "/incidents",
    options: {
      handler: incidentController.findAll,
      tags: ["api", "incidents"],
      description: "List all incidents.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "List incidents.",
            },
            "404": {
              description: "Incidents does not exists.",
            },
          },
        },
      },
    },
  });

  server.route({
    method: "POST",
    path: "/incidents",
    options: {
      handler: incidentController.create,
      tags: ["api", "incidents"],
      description: "Create a Incidents.",
      validate: {
        payload: Joi.object({
          date: Joi.date()
            .required()
            .description("Date of the current Incident"),
          address: Joi.string()
            .required()
            .description("Location of the Incident"),
          customerVehiculePlate: Joi.string()
            .required()
            .description("Client Vehicule plate"),
          customerDocument: Joi.string()
            .required()
            .description("Client Document"),
          policeReport: Joi.string()
            .required()
            .description("Policy report protocol number"),
          thirdPartyList: Joi.array()
            .min(1)
            .items({
              vehicule: {
                name: Joi.string()
                  .required()
                  .description("Third Party Vehicule name"),
                year: Joi.string()
                  .required()
                  .description("Third Party Vehicule Year"),
                plate: Joi.string()
                  .required()
                  .description("Third Party Vehicule Plates"),
                brand: Joi.string()
                  .required()
                  .description("Third Party Vehicule Brand"),
                chassis: Joi.string()
                  .required()
                  .description("Third Party Vehicule Chassis"),
              },
              name: Joi.string().required().description("Third Party Name"),
              document: Joi.string()
                .required()
                .description("Third Party Document"),
              phone: Joi.string()
                .required()
                .description("Third Party phone number"),
              driverLicense: Joi.string()
                .required()
                .description("Third Party Driver License Number"),
            })
            .required()
            .description("Array of third party in Incident"),
        }),
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Incident.",
            },
          },
        },
      },
    },
  });
};
