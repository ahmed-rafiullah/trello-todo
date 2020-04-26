/* eslint-env jest */
const { app } = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const {
  knex
} = require('../configs')

let jwt = null // reuse jwt across all tests

// clear all data and seed new data
beforeAll(async () => {
  console.log('clearing')
  await knex.seed.run()

  // log in first lol
  const response = await request.post('/api/users/login')
    .send({ email: 'khattak@myjobportal.com', password: 'Khattak4105_' })
    .set('Accept', 'application/json')
  jwt = response.body.access_token
  console.log(jwt)
})

// clear all data and re seed data discarding any changes made during the test
// ie inserting a new user
afterAll(async () => {
  console.log(`clearing ${knex.client}`)
  jwt = null
  await knex.seed.run() // reset the database !
  await knex.destroy() // if this is removed a connection is open and jest will not quit !
})


// not testing different query options yet
test('GET /api/todos | get todos response in correct format', async () => {
  const response = await request.get('/api/todos')
    .query({
      // filhal empty
    })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    todos: [
      {
        todoId: 42,
        title: "Now this is pod racing",
        description: "Do this thing that i need to complete",
        completed: 0,
        dateCreated: expect.anything(),
        userId: 16,
        groupId: 8
    },
    {
      todoId: 43,
      title: "Now this is pod racing",
        description: "Do this thing that i need to complete",
        completed: 0,
        dateCreated: expect.anything(),
        userId: 16,
        groupId: null
    }
    ]
  })
})


test('POST /api/todos | create todo with non existent group should return correct error response', async () => {
  const response = await request.post('/api/todos')
    .send({ title: 'testing', description: 'nsadas', group_id: 999 }) // group 999 does not exist 
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
  
      status: 'failed',
      reason: `group resource with id ${999} does not exist`
  
    })
})

test('PUT /api/todo | update todo that does not exist should return correct fail response', async () => {
  const response = await request.put(`/api/todos/${999}`)
    .send({ title: 'testing1' })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: `todo resource with id ${999} does not exist`

  })
})


test('PUT /api/todo | update todo without a required key:value json pair should return correct fail response', async () => {
  const response = await request.put(`/api/todos/${999}`)
    .send({ })
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(400)
  expect(response.body).toEqual({

    status: 'failed',
    reason: `\"value\" must contain at least one of [title, description, completed, group_id]`

  })
})



// todoId to be used in further tests
let todoId = null

test('POST /api/todo | add todo should return correct success response', async () => {
  const response = await request.post('/api/todos')
    .send({ title: 'testing', description: 'testing' }) // group 999 does not exist 
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
  
    status: "success",
    message: "created todo",
    todo: {
        title: "testing",
        description: "testing",
        completed: false,
        user_id: expect.anything(),
        todoId: expect.anything()
    }
  
    })

   
    // set todo id here
    todoId = response.body.todo.todoId
    console.log(typeof todoId )
    console.log(todoId);

})


test('PUT /api/todo | update todo without an existing group should return correct fail response', async () => {
  const response = await request.put(`/api/todos/${todoId}`)
    .send({ title: 'asda', group_id: 3434534543})
    .set('Accept', 'application/json')
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: `group resource with id ${3434534543} does not exist`

  })
})


test('DELETE /api/todos | deleting todo that does not exist should return correct fail response', async () => {
  const response = await request.delete(`/api/todos/${123}`)
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(404)
  expect(response.body).toEqual({

    status: 'failed',
    reason: `todo resource with id ${123} does not exist`

  })
})

test('DELETE /api/groups | deleting group that does exist should return correct response', async () => {
  const response = await request.delete(`/api/todos/${todoId}`)
    .auth(jwt, { type: 'bearer' }) // set auth !

  expect(response.status).toBe(200)
  expect(response.body).toEqual({

    status: 'success',
    result: `delete todo with id ${todoId}`

  })
})