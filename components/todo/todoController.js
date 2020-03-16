const express = require('express');
const Todo = require('./todoModel')
const Groups = require('../group/groupModel')
const {
    todoValidator,
    todoUpdateValidator,
    todoSearchQueryValidator
} = require('./todoValidators')
const {
    idValidator
} = require('../utilities/validators')
const protectResource = require('../middlewares/auth')
const router = express.Router();
const {
    ValidationError
} = require('@hapi/joi')


// create a todo belonging to current user
router.post('/', protectResource, async (req, res) => {
    try {

        const userID = req.body._jwt_.xid
        let todo = await todoValidator.validateAsync(req.body, {
            stripUnknown: true
        })
        // add current users id 
        todo = {
            ...todo,
            user_id: userID
        }

        console.log(todo)

        // do select inset if group id is present in todo
        if ('group_id' in todo) {
            // create model instance to be able to call $validate manually
            const todoInstance = new Todo()

            // validate manually 
            const schemaValidatedTodo = todoInstance.$validate(todo)
            const knex = todoInstance.$knex()

            // check if user has any groups 
            const subquery = await Groups.query().select().distinct('group_id').where('user_id', userID)
            // map subquery to array
            subqueryArray = subquery.map(x => x.group_id)
            const doesGroupExistInSubquery = subqueryArray.find(e => e === todo.group_id)
            // if no group exists then return with no group exists response other wise continue
            // if user groups exist does the groupid exist in that array ?
            if (subquery.length === 0 || typeof doesGroupExistInSubquery === 'undefined') {
                return res.status(404).json({
                    status: 'failed',
                    message: `group resource with id ${todo.group_id} does not exist`,
                })
            }


            // construct select insert query
            // select insert is a bit fucky 
            // https://runkit.com/embed/jzi2sqpb8pu6
            // https://github.com/knex/knex/commit/e74f43cfe57ab27b02250948f8706d16c5d821b8#diff-cb48f4af7c014ca6a7a2008c9d280573R608


            const selectWhereInQuery = knex
                .select(
                    knex.raw(`${schemaValidatedTodo.user_id}`),
                    knex.raw(`"${schemaValidatedTodo.title}"`),
                    knex.raw(`"${schemaValidatedTodo.description}"`),
                    knex.raw(`${schemaValidatedTodo.completed ? 1 : 0}`),
                    knex.raw(`${schemaValidatedTodo.group_id}`))
                .whereIn(schemaValidatedTodo.group_id,
                    subqueryArray
                ).toSQL()

            const result = await knex
                .table(Todo.tableName)
                .insert(knex.raw('(user_id,title, description,completed,group_id) ' + selectWhereInQuery.sql, selectWhereInQuery.bindings));





            console.log(result)

            res.status(201).json({
                status: 'success',
                message: 'created todo',
                todo: schemaValidatedTodo
            })


        } else {
            const result = await Todo.query().insert(todo)
            res.status(201).json({
                status: 'success',
                message: 'created todo',
                todo: result
            })

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error',
        })
    }


});


// edit a todo belonging to current user
router.get('/', protectResource, async (req, res) => {
    try {

        const userID = req.body._jwt_.xid
        const query = await todoSearchQueryValidator.validateAsync(req.query)

        let todoQueryBuilder = Todo.query().select().where('user_id', userID)
        // build search query
        if ('title' in query) {
            todoQueryBuilder = todoQueryBuilder
                .where('title', 'like', `%${query.title}%`)
        }

        if ('description' in query) {
            todoQueryBuilder = todoQueryBuilder
                .where('description', 'like', `%${query.description}%`)
        }

        if ('completed' in query) {
            todoQueryBuilder = todoQueryBuilder
                .where('completed', query.completed)
        }

        if ('group_id' in query) {
            todoQueryBuilder = todoQueryBuilder
                .where('group_id', query.group_id)
        }

        if ('sort' in query && 'sort_on' in query) {
            todoQueryBuilder = todoQueryBuilder
                .orderBy(query.sort_on, query.sort)
        } else {
            // default sorting is based on title and asc
            todoQueryBuilder = todoQueryBuilder
                .orderBy('title', 'asc')
        }


        let page = query.page || 1
        let count = query.count || 10
        let offset = (page - 1) * count

        todoQueryBuilder = todoQueryBuilder.limit(count).offset(offset)

        const result = await todoQueryBuilder

        console.log(result)


        res.status(200).json({
            status: 'success',
            todos: result
        })


    } catch (err) {
        if (err instanceof ValidationError) {
            // ReferenceError action here
            console.log(err)
            return res.status(400).json({
                status: 'failed',
                reason: err.message
            })
        }
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error'
        })
    }
});

// get a todo belonging to current user
router.get('/:id', protectResource, async (req, res) => {

    try {
        const todo_id = await idValidator.validateAsync(req.params.id)
        const user_id = req.body._jwt_.xid
        console.log(user_id)
        console.log(todo_id)
        const todos = await Todo.query().select(['todo_id', 'title', 'description', 'date_created']).where({
            user_id,
            todo_id
        }).limit(1)

        //TODO: Add todo does not exist and return 404 error code
        res.status(200).json({
            status: 'success',
            todos
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error'
        })
    }


});



// delete a todo belonging to current user
router.delete('/:id', protectResource, async (req, res) => {
    try {
        const todo_id = await idValidator.validateAsync(req.params.id)
        const user_id = req.body._jwt_.xid
        const todos = await Todo.query().del().where({
            user_id,
            todo_id
        });

        if (todos === 1) {
            res.status(200).json({
                status: 'success',
                result: `delete todo with id ${todo_id}`,
            })

        } else {
            res.status(404).json({
                status: 'failed',
                reason: `todo resource with id ${todo_id} does not exist`,
            })
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            reason: 'Internal Server Error'
        })
    }

});


// edit a todo belonging to current user
router.put('/:id', protectResource, async (req, res) => {
    try {
        const todoID = await idValidator.validateAsync(req.params.id)
        const userID = req.body._jwt_.xid
        const todo = await todoUpdateValidator.validateAsync(req.body, {
            stripUnknown: true
        });

        let updateResult = 0
        if ('group_id' in todo) {
            console.log('yes')
            // use a subquery to check if the group actually exists and also belongs to current user then
            // update will be 1 other wise 0 for both no existence or no group belongs to user
            const subquery = await Groups.query().select().distinct('group_id').where('user_id', userID)
            // map subquery to array
            subqueryArray = subquery.map(x => x.group_id)
            const doesGroupExistInSubquery = subqueryArray.find(e => e === todo.group_id)
            // if no group exists then return with no group exists response other wise continue
            // if user groups exist does the groupid exist in that array ?
            if (subquery.length === 0 || typeof doesGroupExistInSubquery === 'undefined') {
                return res.status(404).json({
                    status: 'failed',
                    message: `group resource with id ${todo.group_id} does not exist`,
                })
            }

            // groups does indeed exist any 0 result here means todo_id would not match
            updateResult = await Todo.query().patch(todo).where({
                todo_id: todoID
            }).whereIn(todo.group_id, subqueryArray)

            console.log(updateResult)

        } else {
            // no groups used just use regular update query
            updateResult = await Todo.query().patch(todo).where({
                todo_id: todoID,
                user_id: userID
            })
        }

        if (updateResult === 1) {
            res.status(200).json({
                status: 'success',
                message: `updated todo with id ${todoID}`,
                updated_fields: todo
            })

        } else {
            res.status(404).json({
                status: 'failed',
                message: `todo resource with id ${todoID} does not exist`,
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            error: 'Internal Server Error'
        })
    }
});


module.exports = router;