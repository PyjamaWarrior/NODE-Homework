const { DataTypes, Model } = require('sequelize');

const { CAR_FILES } = require('../../constant/dataBaseTables.enum');
const { sequelize } = require('../index');

class CarFile extends Model {
}

CarFile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        file: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false
        },

        car_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: CAR_FILES
    }
);

module.exports = CarFile;
