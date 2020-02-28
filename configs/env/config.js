'use strict'

// pattern insipiration
// https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/#wheretoputyourbuildandscriptfiles



const Joi = require('@hapi/joi')
const result = require('dotenv').config()



if (result.error) {
    throw result.error
}


// check that the required environment variables are present 
[
    'SERVER_PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'NODE_ENV',
    'JWT_SECRET'
].forEach(name => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`)
    }
})


const envSchema = Joi.object().keys({
    SERVER_PORT: Joi.number().integer().greater(0).required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().integer().greater(0).required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    NODE_ENV: Joi.string().required().valid('development', 'production', 'staging'),
    JWT_SECRET: Joi.string().required(),

}).unknown(false)


const {
    error,
    value: validEnv
} = envSchema.validate(result.parsed)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    db: {
        DB_HOST: validEnv.DB_HOST,
        DB_PORT: validEnv.DB_PORT,
        DB_NAME: validEnv.DB_NAME,
        DB_USER: validEnv.DB_USER,
        DB_PASSWORD: validEnv.DB_PASSWORD
    },

    server: {
        NODE_ENV: validEnv.NODE_ENV,
        SERVER_PORT: validEnv.SERVER_PORT
    },

    security: {
        JWT_SECRET: validEnv.JWT_SECRET
    }
}


module.exports = config