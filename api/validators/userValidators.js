const Joi = require('@hapi/joi');
const customPasswordValidator = require('./passwordValidator')




const userRegisterValidator = Joi.object().keys({
    fname: Joi.string().min(1).max(50).required(),
    lname: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().min(1).max(50).required(),
    password: Joi.string().min(8).max(50).custom(customPasswordValidator, 'customPasswordValidator').required(),
})

const userLoginValidator = Joi.object().keys({
    email: Joi.string().email().min(1).max(50).required(),
    password: Joi.string().max(50)
})

const userPasswordChangeValidator = Joi.object().keys({
    old_password: Joi.string().min(8).max(50).custom(customPasswordValidator, 'customPasswordValidator').required(),
    new_password: Joi.string().min(8).max(50).custom(customPasswordValidator, 'customPasswordValidator').required(),
    new_password_again: Joi.string().min(8).max(50).custom(customPasswordValidator, 'customPasswordValidator').required(),
})







module.exports = {
    userRegisterValidator,
    userLoginValidator,
    userPasswordChangeValidator
}