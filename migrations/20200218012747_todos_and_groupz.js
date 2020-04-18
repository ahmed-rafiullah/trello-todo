exports.up = function (knex) {
  return knex.schema.createTable('groupz', table => {
    table.increments('group_id')
    table.string('group_name', 50).notNullable()
    table.dateTime('date_created').notNullable().defaultTo(knex.fn.now())
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('user_id').inTable('users')
  }).createTable('todos', table => {
    table.increments('todo_id')
    table.string('title', 50).notNullable()
    table.text('description').notNullable()
    table.boolean('completed').notNullable()
    table.dateTime('date_created').notNullable().defaultTo(knex.fn.now())

    table.integer('user_id').unsigned().notNullable()
    table.integer('group_id').unsigned()
    table.foreign('user_id').references('user_id').inTable('users')
    table.foreign('group_id').references('group_id').inTable('groupz')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos').dropTableIfExists('groupz')
}
