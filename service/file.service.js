const { CarFile } = require('../dataBase/models');

module.exports = {
    createCarFile: carObject => CarFile.create(carObject),

    deleteCarFile: carId => CarFile.destroy({ where: { car_id: carId } })
};
