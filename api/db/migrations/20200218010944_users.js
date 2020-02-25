exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('user_id');
        table.string('fname', 50).notNullable();
        table.string('lname', 50).notNullable();
        table.string('password', 50).notNullable();
        table.string('email', 50).notNullable().unique();
        table.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};