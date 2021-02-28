const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getUsers);

router.post('/', userMiddleware.isUserObjectValid, userController.createUser);

router.get('/:userId', userMiddleware.isUserIdValid, userController.getUserById);

router.put('/:userId', userMiddleware.isUserIdValid, userMiddleware.isUserObjectValid, userController.updateUser);

router.delete('/:userId', userMiddleware.isUserIdValid, userController.deleteUser);

module.exports = router;
