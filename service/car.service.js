const Car = require('../dataBase/models/Car');
const statusMessages = require('../status-messages/stastus.messages');

module.exports = {
    getCars: async filterObject => {
        const cars = await Car.find(filterObject);

        if (!cars.length) {
            throw new Error(statusMessages.CANT_FIND_CAR);
        }

        return cars;
    },

    getCarById: async carId => {
        const car = await Car.findById(carId);

        if (!car) {
            throw new Error(statusMessages.CANT_FIND_USER);
        }

        return car;
    },

    createCar: async carObject => {
        const cars = await Car.find(carObject);

        if (cars.length) {
            throw new Error(statusMessages.CAR_ALREADY_CREATED);
        }

        await Car.create(carObject);
    },

    updateCar: async (carId, updatedCarObject) => {
        const updatedCar = await Car.findByIdAndUpdate(carId, updatedCarObject);

        if (!updatedCar) {
            throw new Error(statusMessages.CANT_FIND_CAR);
        }

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
    },

    deleteCar: async carId => {
        const deletedCar = await Car.findByIdAndRemove(carId);

        if (!deletedCar) {
            throw new Error(statusMessages.CANT_FIND_CAR);
        }

        // Ще один варіант
        // const res = await Car.deleteOne({ _id: carId });
        //
        // if (!res.deletedCount) {
        //     throw new Error(statusMessages.CANT_FIND_USER);
        // }
    }
};
