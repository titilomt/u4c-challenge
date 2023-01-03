import { Server } from "@hapi/hapi";

import { VehiculeController } from "./controller";
import { getConnection } from "../../main/db";

export default async (server: Server) => {
  const conn = await getConnection();
  const vehiculeController = new VehiculeController(conn);

  server.bind(vehiculeController);

  server.route({
    method: "GET",
    path: "/vehicules",
    options: {
      handler: vehiculeController.findAll,
      tags: ["api", "third-party"],
      description: "List all Vehicules objects.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "List Vehicules.",
            },
            "404": {
              description: "Vehicules does not exists.",
            },
          },
        },
      },
    },
  });
};
