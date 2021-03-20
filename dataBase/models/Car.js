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

const { CARS } = require('../../constant/dataBaseTables.enum');
const { sequelize } = require('../index');
const CarFile = require('./CarFile');

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
        tableName: CARS
    }
);

Car.hasMany(CarFile, {
    foreignKey: 'car_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

module.exports = Car;
