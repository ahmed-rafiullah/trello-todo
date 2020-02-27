const Joi = require('@hapi/joi');




const jwtValidator = Joi.object().keys({
    xid: Joi.number().integer().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    iat: Joi.any().optional(),
    exp: Joi.any().optional()
})




module.exports = {
    jwtValidator
}