const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carMiddleware.isCarSearchQueryValid, carController.getCars);

router.post('/',
    fileMiddleware.checkFile,
    carMiddleware.isCarObjectValid,
    carMiddleware.isCarAlreadyExists,
    carController.createCar);

router.use('/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.isCarByIdExists);

router.get('/:carId', carController.getCarById);

router.put('/:carId', fileMiddleware.checkFile, carMiddleware.isCarObjectValid, carController.updateCar);

router.delete('/:carId', carController.deleteCar);

module.exports = router;
