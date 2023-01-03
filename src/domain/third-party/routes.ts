import { Server } from "@hapi/hapi";

import { ThirdPartyController } from "./controller";
import { getConnection } from "../../main/db";

export default async (server: Server) => {
  const conn = await getConnection();
  const thirdPartyController = new ThirdPartyController(conn);

  server.bind(thirdPartyController);

  server.route({
    method: "GET",
    path: "/third-party",
    options: {
      handler: thirdPartyController.findAll,
      tags: ["api", "third-party"],
      description: "List all Third Party objects.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "List Third Party.",
            },
            "404": {
              description: "Third Party does not exists.",
            },
          },
        },
      },
    },
  });
};
