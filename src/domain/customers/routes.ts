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
