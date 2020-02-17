// const {
//     DataTypes
// } = require('sequelize');
// const Group = require('./groups')
// const User = require('./user')
// const sequelize = require('../../db');

// const Todo = sequelize.define('todo', {
//     todoId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     todoTitle: {
//         type: DataTypes.STRING(45),
//         allowNull: false,
//     },
//     todoDescription: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//     },
//     dateCreated: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//     },
//     // userID: {
//     //     type: DataTypes.INTEGER.UNSIGNED,
//     //     allowNull: false,
//     //     field: 'user_id',
//     //     references: {
//     //         model: User, // Can be both a string representing the table name or a Sequelize model
//     //         key: 'user_id'
//     //     }
//     // },
//     // groupID: {
//     //     type: DataTypes.INTEGER.UNSIGNED,
//     //     allowNull: true,
//     //     field: 'group_id',
//     //     references: {
//     //         model: Group, // Can be both a string representing the table name or a Sequelize model
//     //         key: 'group_id'
//     //     }
//     // },
//     completed: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//     }
// }, {

//     underscored: true
// });

// Todo.belongsTo(User, {
//     foreignKey: {
//         name: 'user_id',
//         allowNull: false
//     },
// });
// Todo.belongsTo(Group, {
//     foreignKey: 'group_id'
// });



// module.exports = Todo;