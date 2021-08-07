import { Connection, createConnection } from "typeorm";

import databaseConfig = require("dotenv");

databaseConfig.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

async function getNewConnection(): Promise<Connection> {
  const connection = await createConnection();
  return connection;
}

export { getNewConnection };
