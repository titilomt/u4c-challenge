import * as dotenv from "dotenv";

dotenv.config();

import { init, start } from "./server";

import "./db";

init().then(() => start());
