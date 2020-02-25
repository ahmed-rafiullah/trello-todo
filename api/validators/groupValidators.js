const Joi = require('@hapi/joi');

const groupValidator = Joi.object().keys({
    group_name: Joi.string().min(1).max(50).required(),
})




module.exports = {
    groupValidator
}