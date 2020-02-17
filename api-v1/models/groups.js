// const {
//     DataTypes
// } = require('sequelize');

// const sequelize = require('../../db');
// const Group = sequelize.define('groups', {
//     groupID: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true,
//         field: 'group_id'
//     },
//     groupName: {
//         type: DataTypes.STRING(45),
//         allowNull: false,
//         field: 'group_name'
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

//     dateCreated: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//         field: 'date_created'
//     },

// }, {
//     underscored: true
// });



// module.exports = Group;