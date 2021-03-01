const statusCodes = require('../constant/statusCodes.enum');
const statusMessages = require('../status-messages/stastus.messages');
const carService = require('../service/car.service');

module.exports = {
    isCarExists: async (req, res, next) => {
        try {
            const cars = await carService.getCars(req.query);

            if (!cars.length) {
                throw new Error(statusMessages.CANT_FIND_CAR);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarByIdExists: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.getCarById(carId);

            if (!car) {
                throw new Error(statusMessages.CANT_FIND_CAR);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarObjectValid: (req, res, next) => {
        try {
            const { manufacturer, model } = req.body;

            if (manufacturer.length > 255 || typeof manufacturer !== 'string') {
                throw new Error(statusMessages.INVALID_MANUFACTURER_NAME);
            }

            if (model.length > 255 || typeof model !== 'string') {
                throw new Error(statusMessages.INVALID_MODEL_NAME);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },
    isCarIdValid: (req, res, next) => {
        try {
            const idRegex = /^[a-f\d]{24}$/i;
            const { carId } = req.params;

            if (!carId.match(idRegex)) {
                throw new Error(statusMessages.NOT_VALID_ID);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
