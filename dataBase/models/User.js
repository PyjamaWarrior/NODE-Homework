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

const { sequelize } = require('../index');

class User extends Model {}

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
        paranoid: true,
        tableName: 'users'
    }
);

module.exports = User;
