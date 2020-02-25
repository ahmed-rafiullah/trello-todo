const Joi = require('@hapi/joi');

const idValidator = Joi.number().integer().greater(0).positive().required()


module.exports = idValidator