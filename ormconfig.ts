import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

export default {
    name: 'default',
    type: 'postgres',
    url: `${process.env.DATABASE_URL}`,
    synchronize: false,
    logging: true,
    "entities": [
        "src/model/*.*"
    ],
    "migrations": [
         "database/migrations/*.*"
    ],
    "cli": {
        "entitiesDir": "src/model",
        "migrationsDir": "database/migrations"
    }
};
