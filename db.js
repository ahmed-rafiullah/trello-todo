const environment = process.env.ENVIRONMENT || 'development'
const knexConfig = require('./knexfile')[environment]
console.log(knexConfig)
const knex = require('knex')(knexConfig)


const dbCheckConnection = () => {
  return knex.raw('select 1+1 as result')
}

module.exports = {
  knex,
  dbCheckConnection
};