/* eslint-env jest */
const { app } = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const {
  knex
} = require('../configs')

// clear all data and seed new data
let jwt = null

beforeAll(async () => {
  console.log('clearing')
  await knex.seed.run()
  console.log('logging in')
  const response = await request.post('/api/users/login')
    .send({ email: 'khattak@myjobportal.com', password: 'Khattak4105_' })
    .set('Accept', 'application/json')
  jwt = response.body.access_token
})

// clear all data and re seed data discarding any changes made during the test
// ie inserting a new user
afterAll(async () => {
  console.log(`clearing ${knex.client}`)
  await knex.seed.run() // reset the database !
  await knex.destroy() // if this is removed a db connection is still open and jest will not quit !
})

test('GET /api/groups | get groups response in correct format', async () => {
  const response = await request.get('/api/groups')
    .query({
      // filhal empty
    })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !
  jwt = response.body.access_token
  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    result: 'user groups',
    groups: [
      {
        group_id: 8,
        group_name: 'done',
        date_created: '2020-02-25T13:17:47.000Z',
        user_id: 16
      }
    ]
  })
})
