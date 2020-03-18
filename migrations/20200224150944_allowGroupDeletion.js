exports.up = function (knex) {
  return knex.schema.table('todos', table => {
    table.dropForeign('group_id')
    table.foreign('group_id').references('group_id').inTable('groupz').onDelete('CASCADE').onUpdate('RESTRICT')
  })
}

exports.down = function (knex) {
  return knex.schema.table('todos', table => {
    table.dropForeign('group_id')
    table.foreign('group_id').references('group_id').inTable('groupz')
  })
}
