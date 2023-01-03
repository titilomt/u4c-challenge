"use strict";

import Hapi, { Server } from "@hapi/hapi";

import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import * as HapiSwagger from "hapi-swagger";

import * as Customers from "../domain/customers";
import * as Incidents from "../domain/incidents";
import * as ThirdParty from "../domain/third-party";
import * as Vehicules from "../domain/vehicules";

const version = process.env.npm_package_version || "1.0.0";
const host = process.env.API_HOST || "localhost";

export let server: Server;

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: 3005,
    host,
    routes: {
      cors: {
        origin: ["*"], // an array of origins or 'ignore'
        headers: ["Accept", "Authorization", "Content-Type", "If-None-Match"], // an array of strings - 'Access-Control-Allow-Headers'
        exposedHeaders: ["WWW-Authenticate", "Server-Authorization"], // an array of exposed headers - 'Access-Control-Expose-Headers',
        additionalExposedHeaders: ["Accept"], // an array of additional exposed headers
        maxAge: 60,
        credentials: true, // boolean - 'Access-Control-Allow-Credentials'
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: "u4c Challenger API Documentation",
      version,
    },
    schemes: ["http", "https"],
  };

  await server.register([Inert, Vision]);

  await server.register({
    plugin: HapiSwagger,
    options: swaggerOptions,
  });

  // Routes will go here
  Customers.init(server);
  Incidents.init(server);
  ThirdParty.init(server);
  Vehicules.init(server);

  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
