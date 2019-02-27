// Update with your config settings.

require('dotenv').config()

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    migrations: {
      directory: '../database/migrations'
    },
    seeds: {
      directory: '../database/seeds'
    },
    debug: true
  }

}
