// default environment is development
const environment = process.env.NODE_ENV || 'development'

console.log('ENVIRONMENT: ' + environment)
const knexConfig = require('./knexfile')[environment]
console.log(knexConfig)
const knex = require('knex')(knexConfig)
const { Model } = require('objection')
Model.knex(knex) // set knex for objection

knex.on('query', console.log)

const dbCheckConnection = () => {
  return knex.raw('select 1+1 as result')
}

module.exports = {
  knex,
  dbCheckConnection
}
