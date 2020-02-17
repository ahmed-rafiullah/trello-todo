// const {
//     DataTypes
// } =
// require('sequelize');
// const sequelize = require('../../db');
// const Group = require('./groups')
// const User = sequelize.define('user', {
//     userId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     fname: {
//         type: DataTypes.STRING(45),
//         allowNull: false
//     },
//     lname: {
//         type: DataTypes.STRING(45),
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING(45),
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING(45),
//         allowNull: false,
//         unique: true,
//         isEmail: true
//     },
//     dateCreated: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//         field: 'date_created'
//     },
// }, {
//     underscored: true
// });

// User.hasMany(Group, {
//     foreignKey: {
//         name: 'user_id',
//         allowNull: false
//     }
// })
// module.exports = User;