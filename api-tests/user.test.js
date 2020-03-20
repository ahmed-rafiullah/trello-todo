/* eslint-env jest */
const { app } = require('../app')
const supertest = require('supertest')
const request = supertest(app)

test('POST /api/users/change-password | users change password should return 400 if no auth header present', async () => {
  const response = await request.post('/api/users/change-password')
  expect(response.status).toBe(400)
  expect(response.body).toEqual({

    status: 'failed',
    reason: 'no authorization header present'

  })
})
