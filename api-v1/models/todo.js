const {
    Model
} = require('objection');

class Todo extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'todos';
    }

    static get idColumn() {
        return 'todo_id';
    }

}

module.exports = {
    Todo
};