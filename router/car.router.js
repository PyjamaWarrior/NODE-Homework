const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carController.getCars);

router.post('/',
    fileMiddleware.checkFile,
    carMiddleware.onCarCreate,
    carMiddleware.isCarAlreadyExists,
    carController.createCar);

router.use('/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.isCarByIdExists);

router.get('/:carId', carController.getCarById);

router.put('/:carId', fileMiddleware.checkFile, carMiddleware.onCarUpdate, carController.updateCar);

router.delete('/:carId', carController.deleteCar);

module.exports = router;
