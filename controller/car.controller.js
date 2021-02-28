const carService = require('../service/car.service');
const statusCodes = require('../constant/statusCodes.enum');
const statusMessages = require('../status-messages/stastus.messages');

module.exports = {
    getCars: async (req, res) => {
        try {
            const cars = await carService.getCars(req.query);

            res.json(cars);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.status(statusCodes.CREATED).json(statusMessages.CAR_CREATED);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    updateCar: async (req, res) => {
        try {
            const { body, params: { carId } } = req;

            await carService.updateCar(carId, body);

            res.json(statusMessages.CAR_UPDATED);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.json(statusMessages.CAR_DELETED);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
