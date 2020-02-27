const Joi = require('@hapi/joi');
const passwordValidator = require('password-validator')

const customPasswordValidator = (value, helpers) => {
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8) // Minimum length 8
        .is().max(50) // Maximum length 50
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits()
        .has().symbols() // Must have digits
        .has().not().spaces(); // Should not have spaces


    const result = passwordSchema.validate(value, {
        list: true
    })

    if (Array.isArray(result) === true && result.length === 0) {
        return value
    } else if (Array.isArray(result) === true && result.length > 0) {
        // TODO throw more descriptive errors
        throw new Error(`password must have ${[...result]} values`)
    } else {
        throw new Error('Inconsistent state encountered')
    }

}



const userRegisterValidator = Joi.object().keys({
    fname: Joi.string().min(1).max(50).required(),
    lname: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().min(1).max(50).required(),
    password: Joi.string().min(8).max(50).custom(passwordValidator, 'customPasswordValidator').required(),
})

const userLoginValidator = Joi.object().keys({
    email: Joi.string().email().min(1).max(50).required(),
    password: Joi.string().max(50)
})

const userPasswordChangeValidator = Joi.object().keys({
    old_password: Joi.string().min(8).max(50).custom(passwordValidator, 'customPasswordValidator').required(),
    new_password: Joi.string().min(8).max(50).custom(passwordValidator, 'customPasswordValidator').required(),
    new_password_again: Joi.string().min(8).max(50).custom(passwordValidator, 'customPasswordValidator').required(),
})







module.exports = {
    userRegisterValidator,
    userLoginValidator,
    userPasswordChangeValidator
}