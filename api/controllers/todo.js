const express = require('express');
const Todo = require('../models/todo')
const Groups = require('../models/groups')
const {
    todoValidator,
    todoUpdateValidator,
    todoSearchQueryValidator
} = require('../validators/todoValidators')
const idValidator = require('../validators/idValidator')
const protectResource = require('./auth')
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

        const result = await Todo.query().insert(todo)

        console.log(result)

        res.status(201).json({
            status: 'success',
            message: 'created todo',
            todo: result
        })

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

        const query = await todoSearchQueryValidator.validateAsync(req.query)

        let todoQueryBuilder = Todo.query().select()
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
            // check if group already exists or not

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


        // TODO: Show total pages left, current page, and total todos
        // //get total number of todos
        // const todoCount = await Todo.query().select().count('todo_id').as('total_todos').from('todos')

        // console.log(todoCount)

        // // based on current count get total number of pages




        const result = await todoQueryBuilder

        console.log(result)


        res.status(200).json({
            status: 'success',
            results: result
        })


    } catch (err) {
        if (err instanceof ValidationError) {
            // ReferenceError action here
            console.log(err)
            return res.status(400).json({
                status: 'failed',
                error: err.message
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
                message: `delete todo with id ${todo_id}`,
            })

        } else {
            res.status(404).json({
                status: 'failed',
                message: `todo resource with id ${todo_id} does not exist`,
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