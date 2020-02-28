const config = require('../env/config')
// default environment is development
const environment = config.server.NODE_ENV || 'development'
const knexConfig = require('./knexfile')[environment]
console.log(knexConfig)
const knex = require('knex')(knexConfig)

knex.on('query', console.log)

const dbCheckConnection = () => {
  return knex.raw('select 1+1 as result')
}

module.exports = {
  knex,
  dbCheckConnection
};