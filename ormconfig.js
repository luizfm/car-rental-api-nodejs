module.exports = {
  "type": "postgres",
  "host": "localhost",
  "username": process.env.DOCKER_USERNAME,
  "password": process.env.DOCKER_PASSWORD,
  "port": 5432,
  "database": process.env.DOCKER_DATABASE,
  "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
