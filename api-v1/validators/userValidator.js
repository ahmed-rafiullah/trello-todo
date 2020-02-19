const Joi = require('joi');
const passwordValidator = require('password-validator')

const customPasswordValidator = (value, helpers) => {
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8) // Minimum length 8
        .is().max(50) // Maximum length 100
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits()
        .has().symbols() // Must have digits
        .has().not().spaces() // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']);

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



const userValidator = Joi.object().keys({
    fname: Joi.string().min(1).max(50).required(),
    lname: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().min(1).max(50).required(),
    password: Joi.string().min(1).max(50).custom(customPasswordValidator, 'customPasswordValidator').required(),
})


module.exports = userValidator