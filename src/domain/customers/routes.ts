import { Server } from "@hapi/hapi";

import Joi from "joi";

import { CustomerController } from "./controller";
import { getConnection } from "../../main/db";

export default async (server: Server) => {
  const conn = await getConnection();
  const customerController = new CustomerController(conn);

  server.bind(customerController);

  server.route({
    method: "GET",
    path: "/customers",
    options: {
      handler: customerController.findAll,
      tags: ["api", "customers"],
      description: "List all customers.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "List Customers.",
            },
            "404": {
              description: "Customers does not exists.",
            },
          },
        },
      },
    },
  });

  server.route({
    method: "PUT",
    path: "/customers/{id}",
    options: {
      handler: customerController.updateCustomer,
      tags: ["api", "customers"],
      description: "Update Customer by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        payload: Joi.object({
          document: Joi.string().required().description("Client document"),
          name: Joi.string().description("Client name"),
          driverLicense: Joi.string().description(
            "Client Driver License number"
          ),
          birth: Joi.date().description("Client Birthday date"),
          phone: Joi.string().description("Client Phone number"),
        }),
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "204": {
              description: "Updated Customer.",
            },
            "404": {
              description: "Customer does not exists.",
            },
          },
        },
      },
    },
  });

  server.route({
    method: "POST",
    path: "/customers",
    options: {
      handler: customerController.create,
      tags: ["api", "customers"],
      description: "Create a Customer.",
      validate: {
        payload: Joi.object({
          document: Joi.string().required().description("Client document"),
          name: Joi.string().required().description("Client name"),
          driverLicense: Joi.string()
            .required()
            .description("Client Driver License number"),
          birth: Joi.date().description("Client Birthday date"),
          phone: Joi.string().required().description("Client Phone number"),
          vehicules: Joi.array()
            .items({
              name: Joi.string().required().description("Client Vehicule Name"),
              year: Joi.string().required().description("Client Vehicule Year"),
              plate: Joi.string()
                .required()
                .description("Client Vehicule Plate"),
              brand: Joi.string()
                .required()
                .description("Client Vehicule Brand"),
              chassis: Joi.string()
                .required()
                .description("Client Vehicule Chassis number"),
            })
            .required()
            .min(1),
        }),
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Customer.",
            },
          },
        },
      },
    },
  });
};
