const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.getCars);

router.post('/', carMiddleware.isCarObjectValid, carController.createCar);

router.put('/:carId', carMiddleware.isCarIdValid, carMiddleware.isCarObjectValid, carController.updateCar);

router.delete('/:carId', carController.deleteCar);

module.exports = router;
