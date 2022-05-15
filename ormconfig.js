require("dotenv").config()

module.exports = {
  name: 'default',
  type: 'postgres',
  url: `${process.env.DATABASE_URL}`,
  synchronize: false,
  logging: true,
  "entities": [
    "build/src/model/*.*"
  ],
  "migrations": [
    "build/src/database/migrations/*.*"
  ],
  "cli": {
    "entitiesDir": "build/src/model",
    "migrationsDir": "build/src/database/migrations"
  },
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
};
