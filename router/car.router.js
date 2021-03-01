const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carMiddleware.isCarExists, carController.getCars);

router.post('/', carMiddleware.isCarObjectValid, carMiddleware.isCarExists, carController.createCar);

router.get('/:carId', carMiddleware.isCarIdValid, carMiddleware.isCarByIdExists, carController.getCarById);

router.put('/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.isCarObjectValid,
    carMiddleware.isCarByIdExists,
    carController.updateCar);

router.delete('/:carId', carMiddleware.isCarByIdExists, carController.deleteCar);

module.exports = router;
