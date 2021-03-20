const { Car } = require('../dataBase/models');

module.exports = {
    getCars: searchObject => Car.findAll({ where: searchObject }),

    getSingleCar: searchObject => Car.findOne({ where: searchObject }),

    getCarById: carId => Car.findByPk(carId),

    createCar: carObject => Car.create(carObject),

    updateCar: (carId, updatedFields) => Car.update(updatedFields, { where: { id: carId } }),

    deleteCar: carId => Car.destroy({ where: { id: carId } }),
};
