const env = require('./env/config')
const logger = require('./logging/winston')
const swaggerSpec = require('./swagger/swagger')
const db = require('./db/db')
const knexConfig = require('./db/knexfile')

module.exports = {
    env,
    logger,
    swaggerSpec,
    ...db,
    knexConfig
}