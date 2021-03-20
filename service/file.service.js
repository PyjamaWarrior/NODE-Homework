const { CarFile } = require('../dataBase/models');

module.exports = {
    createCarFile: carObject => CarFile.create(carObject),

    deleteCarFile: carId => CarFile.deleteMany({ _car_id: carId })
};
