const { AppError } = require('../utilities')

class TodoService {
  constructor (TodoModel) {
    this.TodoModel = TodoModel
  }

  async getTodos ({ body, queryy, todoSearchQueryValidator }) {
    const userID = body._jwt_.xid
    const query = await todoSearchQueryValidator.validateAsync(queryy)

    let todoQueryBuilder = this.TodoModel.query().select().where('user_id', userID)
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

    const page = query.page || 1
    const count = query.count || 10
    const offset = (page - 1) * count

    todoQueryBuilder = todoQueryBuilder.limit(count).offset(offset)

    const result = await todoQueryBuilder

    return result
  }

  async getOneTodo ({ id, idValidator, body }) {
    const todoID = await idValidator.validateAsync(id)
    const userID = body._jwt_.xid
    const todos = await this.TodoModel.query().select(['todo_id', 'title', 'description', 'date_created']).where({
      user_id: userID,
      todo_id: todoID
    }).limit(1)

    if (!todos) {
      throw new AppError(`todo with id ${todoID} does not exists`, 404)
    }

    return todos
  }

  async deleteTodo ({ idValidator, body, id }) {
    const todoID = await idValidator.validateAsync(id)
    const userID = body._jwt_.xid
    const todos = await this.TodoModel.query().del().where({
      user_id: userID,
      todo_id: todoID
    })

    if (!todos) {
      throw new AppError(`todo resource with id ${todoID} does not exist`, 404)
    }

    return { todos, todoID }
  }

  async updateTodo ({ idValidator, id, body, todoUpdateValidator, GroupsModel }) {
    const todoID = await idValidator.validateAsync(id)
    const userID = body._jwt_.xid
    const todo = await todoUpdateValidator.validateAsync(body, {
      stripUnknown: true
    })

    let updateResult = 0
    if ('group_id' in todo) {
      // use a subquery to check if the group actually exists and also belongs to current user then
      // update will be 1 other wise 0 for both no existence or no group belongs to user
      const subquery = await GroupsModel.query().select().distinct('group_id').where('user_id', userID)
      // map subquery to array
      const subqueryArray = subquery.map(x => x.group_id)
      const doesGroupExistInSubquery = subqueryArray.find(e => e === todo.group_id)
      // if no group exists then return with no group exists response other wise continue
      // if user groups exist does the groupid exist in that array ?
      if (subquery.length === 0 || typeof doesGroupExistInSubquery === 'undefined') {
        throw new AppError(`group resource with id ${todo.group_id} does not exist`, 404)
      }

      // groups does indeed exist any 0 result here means todo_id would not match
      updateResult = await this.TodoModel.query().patch(todo).where({
        todo_id: todoID
      }).whereIn(todo.group_id, subqueryArray)

      console.log(updateResult)
    } else {
      // no groups used just use regular update query
      updateResult = await this.TodoModel.query().patch(todo).where({
        todo_id: todoID,
        user_id: userID
      })
    }

    if (!updateResult) {
      throw new AppError(`todo resource with id ${todoID} does not exist`, 404)
    }

    return { todo, todoID }
  }

  async createTodo ({ body, todoValidator, Groups }) {
    const userID = body._jwt_.xid
    let todo = await todoValidator.validateAsync(body, {
      stripUnknown: true
    })
    // add current users id
    todo = {
      ...todo,
      user_id: userID
    }

    // do select inset if group id is present in todo
    if ('group_id' in todo) {
      // create model instance to be able to call $validate manually
      const todoInstance = new this.TodoModel()

      // validate manually
      const schemaValidatedTodo = todoInstance.$validate(todo)
      const knex = todoInstance.$knex()

      // check if user has any groups
      const subquery = await Groups.query().select().distinct('group_id').where('user_id', userID)
      // map subquery to array
      const subqueryArray = subquery.map(x => x.group_id)
      const doesGroupExistInSubquery = subqueryArray.find(e => e === todo.group_id)
      // if no group exists then return with no group exists response other wise continue
      // if user groups exist does the groupid exist in that array ?

      if (subquery.length === 0 || typeof doesGroupExistInSubquery === 'undefined') {
        throw new AppError(`group resource with id ${todo.group_id} does not exist`, 404)
      }

      // construct select insert query
      // select insert is a bit finnicky
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
        .table(this.TodoModel.tableName)
        .insert(knex.raw('(user_id,title, description,completed,group_id) ' + selectWhereInQuery.sql, selectWhereInQuery.bindings))
      return result
    } else {
      const result = await this.TodoModel.query().insert(todo)
      return result
    }
  }
}

module.exports = TodoService
