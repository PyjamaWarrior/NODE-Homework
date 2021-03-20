// const { DataTypes } = require('sequelize');
//
// module.exports = client => {
//     const User = client.define(
//         'User',
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//                 allowNull: false
//             },
//             age: { type: DataTypes.INTEGER, allowNull: false },
//             email: { type: DataTypes.STRING, allowNull: false },
//             firstName: { type: DataTypes.STRING, allowNull: false },
//             lastName: { type: DataTypes.STRING, allowNull: false },
//             password: { type: DataTypes.STRING, allowNull: false }
//         },
//         {
//             tableName: 'users',
//             timestamps: false
//         }
//     );
//
//     return User;
// };
const { DataTypes, Model } = require('sequelize');

const { USERS } = require('../../constant/dataBaseTables.enum');
const { sequelize } = require('../index');
const OAuth = require('./OAuth');

class User extends Model {
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        avatar: {
            type: DataTypes.STRING
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: USERS
    }
);

User.hasMany(OAuth, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

module.exports = User;
