exports.up = function (knex) {
  return knex.schema.raw('ALTER TABLE users MODIFY password varchar(100) NOT NULL')
}

exports.down = function (knex) {
  return knex.schema.raw('ALTER TABLE users MODIFY password varchar(50) NOT NULL')
}
