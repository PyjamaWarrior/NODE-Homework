// const { DataTypes } = require('sequelize');
//
// module.exports = client => {
//     const Car = client.define(
//         'Car',
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//                 allowNull: false
//             },
//             color: { type: DataTypes.STRING, allowNull: false },
//             manufacturer: { type: DataTypes.STRING, allowNull: false },
//             model: { type: DataTypes.STRING, allowNull: false },
//             price: { type: DataTypes.DECIMAL, allowNull: false }
//         },
//         {
//             tableName: 'cars',
//             timestamps: false
//         }
//     );
//
//     return Car;
// };
const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../index');

class Car extends Model {}

Car.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        color: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        manufacturer: {
            type: DataTypes.STRING,
            allowNull: false
        },

        model: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },
    {
        sequelize,
        paranoid: true,
        tableName: 'cars'
    }
);

module.exports = Car;
