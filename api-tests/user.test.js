/* eslint-env jest */
const { app } = require('../app')
const supertest = require('supertest')
const request = supertest(app)

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

test('GET / | any unknown verb or route should give 404 not found json response', async () => {
  const response = await request.get('/')

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: '404 Not Found'

  })
})
