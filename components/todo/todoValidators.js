const Joi = require('@hapi/joi')

const todoValidator = Joi.object().keys({
  title: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(250).required(),
  completed: Joi.bool().optional().default(false),
  group_id: Joi.number().integer().greater(0).positive().optional()
})

// protip dont include default values otherwise there will always be one key present and if it matches the key given in or
// it will be valid to test it give some key a default value!
const todoUpdateValidator =
    Joi.object().keys({
      title: Joi.string().min(1).max(50),
      description: Joi.string().min(1).max(250),
      completed: Joi.bool(),
      group_id: Joi.number().integer().greater(0).positive()
    }).or('title', 'description', 'completed', 'group_id')

const todoSearchQueryValidator =
    Joi.object().keys({
      title: Joi.string().min(1).max(50),
      description: Joi.string().min(1).max(50),
      completed: Joi.bool(),
      group_id: Joi.number().integer().greater(0).positive(),
      page: Joi.number().integer().greater(0).positive(),
      count: Joi.number().integer().greater(0).positive(),
      sort: Joi.string().valid('asc', 'desc'),
      sort_on: Joi.string().valid('title', 'description', 'completed', 'group_id')
    })
      .and('sort', 'sort_on')

// Joi.object().keys({
//     title: Joi.string().min(1).max(50),
//     description: Joi.string().min(1).max(50),
//     completed: Joi.bool(),
//     group_id: Joi.number().integer().greater(0).positive(),
//     sort: Joi.string().valid('asc', 'desc'),
//     sort_on: Joi.string()
//         .when('title', { is: Joi.exist(), then: Joi.valid('title')})
//         .when('description', { is: Joi.exist(), then: Joi.valid('description')})
//         .when('completed', { is: Joi.exist(), then: Joi.valid('completed')})
//         .when('group_id', { is: Joi.exist(), then: Joi.valid('group_id')})
// })
// .or('title', 'description', 'completed', 'group_id')
// .and('sort', 'sort_on')

module.exports = {
  todoValidator,
  todoUpdateValidator,
  todoSearchQueryValidator
}
