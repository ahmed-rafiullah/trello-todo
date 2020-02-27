// const {
//     BaseModel
// } = require('../helpers/BaseModel');
const {
    Model
} = require('objection')
const Todo = require('../todo/todoModel')
const Groups = require('../group/groupModel')


class User extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'user_id';
    }

    // "$schema": "http://json-schema.org/schema#"
    static get jsonSchema() {
        return {

            type: 'object',
            required: ['fname', 'lname', 'email', 'password'],
            properties: {
                fname: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 50
                },
                lname: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 50
                },
                email: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 50
                },
                password: {
                    type: 'string',
                    minLength: 8,
                    maxLength: 100
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
                    from: 'todos.user_id',
                    to: 'users.user_id'
                }
            },

            groups: {
                relation: Model.HasManyRelation,
                modelClass: Groups,
                join: {
                    from: 'groups.user_id',
                    to: 'users.user_id'
                }
            }
        }
    }
}

module.exports = User