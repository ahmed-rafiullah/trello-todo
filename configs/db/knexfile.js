// Update with your config settings.
const path = require('path')
const config = require('../env/config')
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      port: config.db.DB_PORT,
      host: config.db.DB_HOST,
      user: config.db.DB_USER,
      password: config.db.DB_PASSWORD,
      database: config.db.DB_NAME,
      debug: false

    },
    migrations: {
      directory: path.normalize(path.join(__dirname, '/api/db/migrations'))
    },
    seeds: {
      directory: path.normalize(__dirname + '/api/db/seeds')
    }

  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};