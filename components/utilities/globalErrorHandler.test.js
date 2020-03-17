const validators = require('./validators')
const {
    ValidationError
} = require('@hapi/joi')


// first test experiments

test('expect idValidator to pass and be a positive number greater than 0', () => {
    const id = validators.idValidator.validate(9).value
    expect(id).toBeGreaterThan(0)

});


test('expect idValidator to be an error object and should fail when given a 0', () => {
    const error = validators.idValidator.validate(0).error
    expect(error).toBeInstanceOf(ValidationError)
});


test('expect idValidator to be an error object and should fail when given a < 0 number', () => {
    const error = validators.idValidator.validate(-1).error
    expect(error).toBeInstanceOf(ValidationError)
});