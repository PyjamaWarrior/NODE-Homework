const { carService } = require('../service');
const { statusCodesEnum } = require('../constant');
const { statusMessages } = require('../status-messages');
const { commonValidators, carValidators } = require('../validator');

module.exports = {
    isCarSearchQueryValid: (req, res, next) => {
        try {
            const { error } = carValidators.carObjectValidator.validate(req.query);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isCarExists: async (req, res, next) => {
        try {
            const cars = await carService.getCars(req.query);

            if (!cars.length) {
                throw new Error(statusMessages.CANT_FIND_CAR);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
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
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
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
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    isCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;
            const { error } = commonValidators.mongodbIdValidator.validate(carId);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
