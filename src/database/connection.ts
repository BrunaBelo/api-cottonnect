import { Connection, createConnection, getConnectionOptions } from "typeorm";

const newConnection = async (host = "db"): Promise<Connection> => {
  const options = await getConnectionOptions();
  Object.assign(options, {
    host,
  });
  const connection = await createConnection(options);
  return connection;
};

export { newConnection };
