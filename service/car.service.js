const Car = require('../dataBase/models/Car');

module.exports = {
    getCars: filterObject => Car.find(filterObject),

    getCarById: carId => Car.findById(carId),

    createCar: carObject => Car.create(carObject),

    updateCar: (carId, updatedCarObject) => Car.findByIdAndUpdate(carId, updatedCarObject),
    // Ще один варіант
    // const res = await Car.updateOne({ _id: carId }, updatedCarObject);
    //
    // if (!res.n) {
    //     throw new Error(statusMessages.CANT_FIND_USER);
    // }
    //
    // if (!res.nModified) {
    //     throw new Error(statusMessages.CANT_UPDATE_USER);
    // }

    deleteCar: carId => Car.findByIdAndRemove(carId)

    // Ще один варіант
    // const res = await Car.deleteOne({ _id: carId });
    //
    // if (!res.deletedCount) {
    //     throw new Error(statusMessages.CANT_FIND_USER);
    // }
};
