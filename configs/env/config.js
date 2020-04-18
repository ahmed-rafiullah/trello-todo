'use strict'

// pattern insipiration
// https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/#wheretoputyourbuildandscriptfiles

const appRoot = require('app-root-path')
const Joi = require('@hapi/joi')
const result = require('dotenv-flow').config({
  path: `${appRoot}/envs`,
  default_node_env: process.env.NODE_ENV || 'development'
})

const AppError = require('../../components/utilities/appError')

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
  'JWT_SECRET'
].forEach(name => {
  if (!process.env[name]) {
    console.log(name, process.env[name])
    throw new AppError(`Environment variable ${name} is missing`, 500, true)
  }
})

// create schemas to verify config object is correct

const dbSchema = Joi.object().keys({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().integer().greater(0).required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required()
}).required()

const serverSchema = Joi.object().keys({
  SERVER_PORT: Joi.number().integer().greater(0).required()
}).required()

const securitySchema = Joi.object().keys({
  JWT_SECRET: Joi.string().required(),
  SALT_ROUNDS: Joi.number().integer().min(10)
}).required()

const envSchema = Joi.object().keys({
  server: serverSchema,
  db: dbSchema,
  security: securitySchema
}).unknown(false)

// create config object
const config = {
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
  },

  server: {
    SERVER_PORT: process.env.SERVER_PORT
  },

  security: {
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: 10
  }
}

const {
  error
} = envSchema.validate(config)

if (error) {
  throw new AppError(`Config validation error: ${error.message}`, 500, true)
}

module.exports = config
