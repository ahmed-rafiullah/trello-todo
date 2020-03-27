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
  jwt = null
  await knex.seed.run() // reset the database !
  await knex.destroy() // if this is removed a connection is open and jest will not quit !
})

let jwt = null

test('POST /api/users/login | login using valid user credentials should send back correct response including jwt', async () => {
  const response = await request.post('/api/users/login')
    .send({ email: 'khattak@myjobportal.com', password: 'Khattak4105_' })
    .set('Accept', 'application/json')

  jwt = response.body.access_token
  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    result: 'login successful',
    access_token: expect.anything()

  })
})

test('POST /api/users/login | login using invalid user password should send back error response', async () => {
  const response = await request.post('/api/users/login')
    .send({ email: 'khattak@myjobportal.com', password: 'Khattak4105' })
    .set('Accept', 'application/json')

  expect(response.status).toBe(401)
  expect(response.body).toEqual({
    status: 'failed',
    reason: 'email or password is incorrect'
  })
})

test('POST /api/users/change-password | users change password should return 400 and "incorrect password" error response', async () => {
  const response = await request.post('/api/users/change-password')
    .send({
      old_password: 'Khattak4105_asdasd', // old password is incorrect also probably should name it current password
      new_password: 'Khattak4105_a',
      new_password_again: 'Khattak4105_a'
    })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(400)
  expect(response.body).toEqual({

    status: 'failed',
    reason: 'incorrect password'

  })
})

test('POST /api/users/change-password | users change password should return 400 and "new passwords must match" error response', async () => {
  const response = await request.post('/api/users/change-password')
    .send({
      old_password: 'Khattak4105_',
      new_password: 'Khattak4105_b', // new and new_password_again dont match
      new_password_again: 'Khattak4105_a'
    })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(400)
  expect(response.body).toEqual({

    status: 'failed',
    reason: 'new passwords must match'

  })
})

test('POST /api/users/change-password | users change password should return 400 and "new password cannot be same as old password" error response', async () => {
  const response = await request.post('/api/users/change-password')
    .send({
      old_password: 'Khattak4105_',
      new_password: 'Khattak4105_', // new and new_password_again dont match
      new_password_again: 'Khattak4105_'
    })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(400)
  expect(response.body).toEqual({

    status: 'failed',
    reason: 'new password cannot be same as old password'

  })
})

test('POST /api/users/change-password | users change password should return 400 and "user no longer exists" error response', async () => {
  /*
    NOTE:
      Here we must delete user from data base so the scenario is as follows
      Users jwt is valid but the user has been deleted (assume this for now)
      the change password should fail and return user no longer exists

      i used user_id instead of email to berevity and the fact that since db is seeded with user_id already
      provided which for user with khattak@myjobportal.com is 16 it will only change if corresponding
      entries in the seed files are changed

    IMPORTANT:
      This test should be placed last otherwise any other tests that would need this user would fail
      as the user no longer exists :)
   */

  await knex.queryBuilder().table('todos').where('user_id', 16).delete()
  await knex.queryBuilder().table('groupz').where('user_id', 16).delete()
  await knex.queryBuilder().table('users').where({
    email: 'khattak@myjobportal.com'
  }).delete()
  // by now the user is delete
  const response = await request.post('/api/users/change-password')
    .send({
      old_password: 'Khattak4105_',
      new_password: 'Khattak4105_', // new and new_password_again dont match
      new_password_again: 'Khattak4105_'
    })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: 'user no longer exists'

  })
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
