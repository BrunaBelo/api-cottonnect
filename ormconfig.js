require("dotenv").config()

module.exports = {
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
  },
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
};
