const { Car } = require('../dataBase/models');

module.exports = {
    getCars: filterObject => Car.find(filterObject),

    getSingleCar: filterObject => Car.findOne(filterObject),

    getCarById: CarId => Car.findById(CarId),

    createCar: CarObject => Car.create(CarObject),

    updateCar: (CarId, updateObject) => Car.findByIdAndUpdate(CarId, { $set: updateObject }),

    deleteCar: CarId => Car.findByIdAndRemove(CarId)
};
