import { getConnectionOptions, createConnection, Connection } from "typeorm";

async function createTypeormConn(): Promise<Connection> {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  console.log("oiiii");
  const newConnection = await createConnection({
    ...connectionOptions,
    name: "default",
  });
  return newConnection;
}

createTypeormConn();
