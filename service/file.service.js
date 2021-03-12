const { CarFile } = require('../dataBase/models');

module.exports = {
    createCarFile: CarObject => CarFile.create(CarObject),

    deleteCarFile: CarId => CarFile.deleteMany({ _car_id: CarId })
};
