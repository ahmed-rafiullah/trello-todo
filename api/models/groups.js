// const {
//     BaseModel
// } = require('../helpers/BaseModel');

const {
    Model
} = require('objection')
const Todo = require('./todo')

class Group extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'groupz';
    }

    static get idColumn() {
        return 'group_id';
    }

    // "$schema": "http://json-schema.org/schema#"
    static get jsonSchema() {
        return {

            type: 'object',
            required: ['group_name', 'user_id'],
            properties: {
                group_name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 50
                },
                user_id: {
                    type: 'integer'

                }
            }
        }
    }

    static get relationMappings() {
        return {
            todos: {

                relation: Model.HasManyRelation,
                modelClass: Todo,
                join: {
                    from: 'todos.group_id',
                    to: 'groupz.group_id'
                }
            }
        }
    }


}

module.exports = Group