const Joi = require('@hapi/joi')

const groupValidator = Joi.object().keys({
  group_name: Joi.string().min(1).max(50).required()
})

const groupSearchQueryValidator =
    Joi.object().keys({
      group_name: Joi.string().min(1).max(50),
      page: Joi.number().integer().greater(0).positive(),
      count: Joi.number().integer().greater(0).positive(),
      sort: Joi.string().valid('asc', 'desc'),
      sort_on: Joi.string().valid('group_name')
    })
      .and('sort', 'sort_on')

module.exports = {
  groupValidator,
  groupSearchQueryValidator
}
