module.exports = {
  "type": 'postgres',
  "url": process.env.DATABASE_URL,
  "entities": [
    "dist/entities/**/*.js"
  ],
  "migrations": [
    "dist/migrations/**/*.js"
  ],
  "cli": {
    "migrationsDir": [
      "src/database/migrations/"
    ],
    "entitiesDir": "src/entities"
  }
}