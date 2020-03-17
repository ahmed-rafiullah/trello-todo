// Update with your config settings.
// const path = require('path')

// NOTE: need to provide NODE_ENV=<environment> for making knex migrate work
// the problem is just setting --env testing would use the testing db 
// BUT the config would not use the .env.testing and .env.testing.local because NODE_ENV was not set 
// and the config code needs that to be set to load the appropriate env files
// so always use cross-env and set appropriate environment like so: 
// npx cross-env NODE_ENV=testing knex migrate:latest  --knexfile configs/db/knexfile.js
// for seeds both cross-env and  and --env commands work
const config = require('../env/config')
const appRoot = require('app-root-path')
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
      directory: `${appRoot}/migrations`
    },
    seeds: {
      directory: `${appRoot}/seeds/development`
    }

  },


  testing: {
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
      directory: `${appRoot}/migrations`
    },
    seeds: {
      directory: `${appRoot}/seeds/testing`
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