/* eslint-env jest */
const { app } = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const {
  knex
} = require('../configs')

// clear all data and seed new data
beforeAll(async () => {
  console.log('clearing')
  await knex.seed.run()
})

// clear all data and re seed data discarding any changes made during the test
// ie inserting a new user
afterAll(async () => {
  console.log(`clearing ${knex.client}`)
  await knex.seed.run() // reset the database !
  await knex.destroy() // if this is removed a connection is open and jest will not quit !
})

test('POST /api/users/change-password | users change password should return 400 if no auth header present', async () => {
  const response = await request.post('/api/users/change-password')
    .send({ })
    .set('Accept', 'application/json')

  expect(response.status).toBe(400)
  expect(response.body).toEqual({

    status: 'failed',
    reason: 'no authorization header present'

  })
})

test('POST /api/users/login | login using valid user credentials should send back correct response including jwt', async () => {
  const response = await request.post('/api/users/login')
    .send({ email: 'khattak@myjobportal.com', password: 'Khattak4105_' })
    .set('Accept', 'application/json')

  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    result: 'login successful',
    access_token: expect.anything()

  })
})

test('POST /api/users/register | register brand new user should send back correct response', async () => {
  const response = await request.post('/api/users/register')
    .send({
      fname: 'Ahmed',
      lname: 'Rafiullah',
      email: 'testing@todoapp.com',
      password: 'Khattak4105_'
    })
    .set('Accept', 'application/json')

  expect(response.status).toBe(201)
  expect(response.body).toEqual({

    status: 'success',
    result: 'registered user successfully',
    user: {
      fname: 'Ahmed',
      lname: 'Rafiullah',
      email: 'testing@todoapp.com',
      user_id: expect.anything()
    }

  })
  expect(response.body.user.user_id).not.toBeNaN() // make sure it is a number
})

test('POST /api/users/register | register user having same email should send back correct fail response', async () => {
  const response = await request.post('/api/users/register')
    .send({
      fname: 'Ahmed',
      lname: 'Rafiullah',
      email: 'testing@todoapp.com',
      password: 'Khattak4105_'
    })
    .set('Accept', 'application/json')

  expect(response.status).toBe(400)
  expect(response.body).toEqual({
    status: 'failed',
    reason: 'email already exists'
  })
})

test('GET / | any unknown verb or route should give 404 not found json response', async () => {
  const response = await request.get('/')

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: '404 Not Found'

  })
})
