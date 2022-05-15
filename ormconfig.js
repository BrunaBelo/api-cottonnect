require("dotenv").config()

module.exports = {
  name: 'default',
  type: 'postgres',
  url: `${process.env.DATABASE_URL}`,
  synchronize: false,
  logging: true,
  "entities": [
      "../model/*.*"
  ],
  "migrations": [
        "database/migrations/*.*"
  ],
  "cli": {
      "entitiesDir": "../model",
      "migrationsDir": "database/migrations"
  },
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
};
