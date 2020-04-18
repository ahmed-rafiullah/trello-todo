/* eslint-env jest */
const { app } = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const {
  knex
} = require('../configs')

let jwt = null
let groupID = null

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

// not testing different query options yet
test('GET /api/groups | get groups response in correct format', async () => {
  const response = await request.get('/api/groups')
    .query({
      // filhal empty
    })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    result: 'user groups',
    groups: [
      {
        group_id: 8,
        group_name: 'done',
        date_created: expect.anything(),
        user_id: 16
      }
    ]
  })
})

test('POST /api/groups | create group with name `testing` should return correct response', async () => {
  const response = await request.post('/api/groups')
    .send({ group_name: 'testing' })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(201)
  expect(response.body).toEqual({

    status: 'success',
    message: 'created group',
    group: {
      group_name: 'testing',
      user_id: 16,
      group_id: expect.anything()
    }
  })

  expect(response.body.group.group).not.toBeNaN()
  groupID = response.body.group.group_id
})

test('PUT /api/groups | edit group with name `testing` to `testing1` should return correct response', async () => {
  const response = await request.put(`/api/groups/${groupID}`)
    .send({ group_name: 'testing1' })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    message: `updated group with id ${groupID}`,
    updated_fields: {
      group_name: 'testing1'
    }
  })
})

test('PUT /api/groups | edit group that does not exist should return correct fail response', async () => {
  const response = await request.put(`/api/groups/${123}`)
    .send({ group_name: 'testing1' })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: `group resource with id ${123} does not exist`

  })
})

test('DELETE /api/groups | deleting group that does not exist should return correct fail response', async () => {
  const response = await request.delete(`/api/groups/${123}`)
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: `group resource with id ${123} does not exist`

  })
})

test('DELETE /api/groups | deleting group that does exist should return correct response', async () => {
  const response = await request.delete(`/api/groups/${groupID}`)
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    message: `deleted group resource with id ${groupID}`

  })
})
