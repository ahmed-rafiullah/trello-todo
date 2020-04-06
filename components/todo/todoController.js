const express = require('express')
const Todo = require('./todoModel')
const TodoService = require('./todoService')
const {
  Group: Groups
} = require('../group/')
const {
  todoValidator,
  todoUpdateValidator,
  todoSearchQueryValidator
} = require('./todoValidators')
const {
  idValidator
} = require('../utilities')

const protectResource = require('../middlewares')
const router = express.Router()

// // create a todo belonging to current user
// router.post('/', protectResource, async (req, res) => {
//   try {
//     const userID = req.body._jwt_.xid
//     let todo = await todoValidator.validateAsync(req.body, {
//       stripUnknown: true
//     })
//     // add current users id
//     todo = {
//       ...todo,
//       user_id: userID
//     }

//     console.log(todo)

//     // do select inset if group id is present in todo
//     if ('group_id' in todo) {
//       // create model instance to be able to call $validate manually
//       const todoInstance = new Todo()

//       // validate manually
//       const schemaValidatedTodo = todoInstance.$validate(todo)
//       const knex = todoInstance.$knex()

//       // check if user has any groups
//       const subquery = await Groups.query().select().distinct('group_id').where('user_id', userID)
//       // map subquery to array
//       const subqueryArray = subquery.map(x => x.group_id)
//       const doesGroupExistInSubquery = subqueryArray.find(e => e === todo.group_id)
//       // if no group exists then return with no group exists response other wise continue
//       // if user groups exist does the groupid exist in that array ?
//       if (subquery.length === 0 || typeof doesGroupExistInSubquery === 'undefined') {
//         return res.status(404).json({
//           status: 'failed',
//           message: `group resource with id ${todo.group_id} does not exist`
//         })
//       }

//       // construct select insert query
//       // select insert is a bit finnicky
//       // https://runkit.com/embed/jzi2sqpb8pu6
//       // https://github.com/knex/knex/commit/e74f43cfe57ab27b02250948f8706d16c5d821b8#diff-cb48f4af7c014ca6a7a2008c9d280573R608

//       const selectWhereInQuery = knex
//         .select(
//           knex.raw(`${schemaValidatedTodo.user_id}`),
//           knex.raw(`"${schemaValidatedTodo.title}"`),
//           knex.raw(`"${schemaValidatedTodo.description}"`),
//           knex.raw(`${schemaValidatedTodo.completed ? 1 : 0}`),
//           knex.raw(`${schemaValidatedTodo.group_id}`))
//         .whereIn(schemaValidatedTodo.group_id,
//           subqueryArray
//         ).toSQL()

//       const result = await knex
//         .table(Todo.tableName)
//         .insert(knex.raw('(user_id,title, description,completed,group_id) ' + selectWhereInQuery.sql, selectWhereInQuery.bindings))

//       console.log(result)

//       res.status(201).json({
//         status: 'success',
//         message: 'created todo',
//         todo: schemaValidatedTodo
//       })
//     } else {
//       const result = await Todo.query().insert(todo)
//       res.status(201).json({
//         status: 'success',
//         message: 'created todo',
//         todo: result
//       })
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       status: 'failed',
//       error: 'Internal Server Error'
//     })
//   }
// })

// create a todo belonging to current user
router.post('/', protectResource, async (req, res, next) => {
  try {
    const dataObj = {
      body: req.body,
      todoValidator,
      Groups
    }
    const todoService = new TodoService(Todo)
    const result = await todoService.createTodo(dataObj)

    res.status(201).json({
      status: 'success',
      message: 'created todo',
      todo: result
    })
  } catch (err) {
    next(err)
  }
})

// edit a todo belonging to current user
// router.get('/', protectResource, async (req, res, next) => {
//   try {
//     const userID = req.body._jwt_.xid
//     const query = await todoSearchQueryValidator.validateAsync(req.query)

//     let todoQueryBuilder = Todo.query().select().where('user_id', userID)
//     // build search query
//     if ('title' in query) {
//       todoQueryBuilder = todoQueryBuilder
//         .where('title', 'like', `%${query.title}%`)
//     }

//     if ('description' in query) {
//       todoQueryBuilder = todoQueryBuilder
//         .where('description', 'like', `%${query.description}%`)
//     }

//     if ('completed' in query) {
//       todoQueryBuilder = todoQueryBuilder
//         .where('completed', query.completed)
//     }

//     if ('group_id' in query) {
//       todoQueryBuilder = todoQueryBuilder
//         .where('group_id', query.group_id)
//     }

//     if ('sort' in query && 'sort_on' in query) {
//       todoQueryBuilder = todoQueryBuilder
//         .orderBy(query.sort_on, query.sort)
//     } else {
//       // default sorting is based on title and asc
//       todoQueryBuilder = todoQueryBuilder
//         .orderBy('title', 'asc')
//     }

//     const page = query.page || 1
//     const count = query.count || 10
//     const offset = (page - 1) * count

//     todoQueryBuilder = todoQueryBuilder.limit(count).offset(offset)

//     const result = await todoQueryBuilder

//     console.log(result)

//     res.status(200).json({
//       status: 'success',
//       todos: result
//     })
//   } catch (err) {
//     next(err)
//   }
// })

// search user todos
router.get('/', protectResource, async (req, res, next) => {
  try {
    const dataObj = {
      body: req.body,
      queryy: req.query,
      todoSearchQueryValidator

    }
    const todoService = new TodoService(Todo)
    const result = await todoService.getTodos(dataObj)

    res.status(200).json({
      status: 'success',
      todos: result
    })
  } catch (err) {
    next(err)
  }
})

// // get a todo belonging to current user
// router.get('/:id', protectResource, async (req, res, next) => {
//   try {
//     const todoID = await idValidator.validateAsync(req.params.id)
//     const userID = req.body._jwt_.xid
//     const todos = await Todo.query().select(['todo_id', 'title', 'description', 'date_created']).where({
//       user_id: userID,
//       todo_id: todoID
//     }).limit(1)

//     // TODO: Add todo does not exist and return 404 error code
//     res.status(200).json({
//       status: 'success',
//       todos
//     })
//   } catch (err) {
//     next(err)
//   }
// })

// get a todo belonging to current user
router.get('/:id', protectResource, async (req, res, next) => {
  try {
    const dataObj = {
      idValidator,
      body: req.body,
      id: req.params.id
    }

    const todoService = new TodoService(Todo)
    const todo = await todoService.getOneTodo(dataObj)

    res.status(200).json({
      status: 'success',
      todo
    })
  } catch (err) {
    next(err)
  }
})

// delete a todo belonging to current user
// router.delete('/:id', protectResource, async (req, res, next) => {
//   try {
//     const todoID = await idValidator.validateAsync(req.params.id)
//     const userID = req.body._jwt_.xid
//     const todos = await Todo.query().del().where({
//       user_id: userID,
//       todo_id: todoID
//     })

//     if (todos === 1) {
//       res.status(200).json({
//         status: 'success',
//         result: `delete todo with id ${todoID}`
//       })
//     } else {
//       res.status(404).json({
//         status: 'failed',
//         reason: `todo resource with id ${todoID} does not exist`
//       })
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// delete a todo belonging to current user
router.delete('/:id', protectResource, async (req, res, next) => {
  try {
    const dataObj = {
      idValidator,
      body: req.body,
      id: req.params.id
    }

    const todoService = new TodoService(Todo)
    const result = await todoService.deleteTodo(dataObj)

    res.status(200).json({
      status: 'success',
      result: `delete todo with id ${result.todoID}`
    })
  } catch (err) {
    next(err)
  }
})

// edit a todo belonging to current user
router.put('/:id', protectResource, async (req, res, next) => {
  try {
    const dataObj = {
      idValidator,
      todoUpdateValidator,
      id: req.params.id,
      body: req.body

    }

    const todoService = new TodoService(Todo)
    const updateResult = await todoService.updateTodo(dataObj)

    res.status(200).json({
      status: 'success',
      message: `updated todo with id ${updateResult.todoID}`,
      updated_fields: updateResult.todo
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
