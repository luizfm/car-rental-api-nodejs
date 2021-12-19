module.exports = {
  "type": "postgres",
  "host": "localhost",
  "username": process.env.DOCKER_USERNAME,
  "password": process.env.DOCKER_PASSWORD,
  "port": 5432,
  "database": process.env.DOCKER_DATABASE,
  "entities": ["./src/modules/cars/entities/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
