const { statusCodesEnum } = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { carService } = require('../service');
const { statusMessages } = require('../status-messages');
const { commonValidators, carValidator } = require('../validator');

module.exports = {
    isCarAlreadyExists: async (req, res, next) => {
        try {
            const { manufacturer, model } = req.body;

            const car = await carService.getSingleCar({ manufacturer, model });

            if (car) {
                throw new ErrorHandler(statusCodesEnum.CONFLICT, statusMessages.RECORD_ALREADY_EXISTS.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarByIdExists: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.getCarById(carId);

            if (!car) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, statusMessages.RECORD_NOT_FOUND.customCode);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    onCarCreate: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    statusCodesEnum.BAD_REQUEST,
                    statusMessages.JOI_VALIDATION_FAILED.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    onCarUpdate: (req, res, next) => {
        try {
            const { error } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    statusCodesEnum.BAD_REQUEST,
                    statusMessages.JOI_VALIDATION_FAILED.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;
            const { error } = commonValidators.mongodbIdValidator.validate(carId);

            if (error) {
                throw new ErrorHandler(
                    statusCodesEnum.BAD_REQUEST,
                    statusMessages.JOI_VALIDATION_FAILED.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
