exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(() => {
      return knex('groupz').del()
    }).then(() => {
      return knex('users').del()
    })
}
