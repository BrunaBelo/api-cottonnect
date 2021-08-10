import { getConnectionOptions, createConnection, getConnection } from "typeorm";
import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const connection = {
  async create(host = 'localhost') {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, { host })
    await createConnection(connectionOptions);
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      const schemaPrefix = entity.schema ? `${entity.schema}.` : '';
      await repository.query(
        `TRUNCATE ${schemaPrefix}${entity.tableName} RESTART IDENTITY CASCADE`
      );
    }
  },
}

export default connection;

