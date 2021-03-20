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

const { O_AUTH } = require('../../constant/dataBaseTables.enum');
const { sequelize } = require('../index');

class OAuth extends Model {}

OAuth.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: O_AUTH,
        timestamps: false
    }
);

module.exports = OAuth;
