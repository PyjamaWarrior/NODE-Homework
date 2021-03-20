const { constants, foldersNamesEnum: { CARS, DOCS, IMAGES }, statusCodesEnum } = require('../constant');
const { fileHelper } = require('../helper');
const { carService, fileService } = require('../service');
const { statusMessages } = require('../status-messages');

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const cars = await carService.getCars(req.query);

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            const { car } = req;

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const { body, docs, images } = req;

            const car = await carService.createCar(body);

            if (docs && docs.length) {
                await fileHelper.carFileUploader(car._id, docs, DOCS, constants.DOC);
            }

            if (images && images.length) {
                await fileHelper.carFileUploader(car._id, images, IMAGES, constants.IMG);
            }

            res.status(statusCodesEnum.CREATED).json({ code: statusMessages.RECORD_CREATED.customCode });
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const {
                body,
                docs,
                images,
                params: { carId }
            } = req;

            const car = await carService.updateCar(carId, body);

            if (docs && docs.length) {
                await fileHelper.carFileUploader(car._id, docs, DOCS, constants.DOC);
            }

            if (images && images.length) {
                await fileHelper.carFileUploader(car._id, images, IMAGES, constants.IMG);
            }

            res.json({ code: statusMessages.RECORD_UPDATED.customCode });
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const deletedCar = await carService.deleteCar(carId);

            await fileHelper.filesDeleter(deletedCar._id, CARS);
            await fileService.deleteCarFile(deletedCar._id);

            res.json({ code: statusMessages.RECORD_DELETED.customCode });
        } catch (e) {
            next(e);
        }
    }
};
