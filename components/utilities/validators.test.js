/* eslint-env jest */
const validators = require('./validators')
const {
  ValidationError
} = require('@hapi/joi')

// idValidators

test('expect idValidator to pass and be a positive number greater than 0', () => {
  const id = validators.idValidator.validate(9).value
  expect(id).toBeGreaterThan(0)
})

test('expect idValidator to fail and be an error object', () => {
  const error = validators.idValidator.validate(undefined).error
  expect(error).toBeInstanceOf(ValidationError)
})

test('expect idValidator to be an error object and should fail when given a 0', () => {
  const error = validators.idValidator.validate(0).error
  expect(error).toBeInstanceOf(ValidationError)
})

test('expect idValidator to be an error object and should fail when given a < 0 number', () => {
  const error = validators.idValidator.validate(-1).error
  expect(error).toBeInstanceOf(ValidationError)
})

// jwtValidator

test('expect jwtValidator to be an error object and should fail when xid missing', () => {
  const error = validators.jwtValidator.validate({

    name: 'hehehe',
    email: 'khattak.ahmed@yahoo.com'
  }).error
  expect(error).toBeInstanceOf(ValidationError)
})

test('expect jwtValidator to be an error object and should fail name is missing', () => {
  const error = validators.jwtValidator.validate({
    xid: 34,
    email: 'khattak.ahmed@yahoo.com'
  }).error
  expect(error).toBeInstanceOf(ValidationError)
})

test('expect jwtValidator to be an error object and should fail when email is missing', () => {
  const error = validators.jwtValidator.validate({
    xid: 34,
    name: 'hehehe'
  }).error
  expect(error).toBeInstanceOf(ValidationError)
})

test('expect jwtValidator to be an error object and should fail when email is not email like string', () => {
  const error = validators.jwtValidator.validate({
    xid: 34,
    name: 'hehehe',
    email: 'khattak.ahmedyahoo.com'
  }).error
  expect(error).toBeInstanceOf(ValidationError)
})

test('expect jwtValidator pass when correct xid name and email are present', () => {
  const error = validators.jwtValidator.validate({
    xid: 34,
    name: 'hehehe',
    email: 'khattak.ahmedyahoo.com'
  }).value
  expect(error).toEqual({
    xid: 34,
    name: 'hehehe',
    email: 'khattak.ahmedyahoo.com'
  })
})
