const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userMiddleware.isUserSearchQueryValid, userController.getUsers);

router.post('/', userMiddleware.isUserObjectValid, userMiddleware.isEmailTaken, userController.createUser);

router.get('/:userId', userMiddleware.isUserIdValid, userMiddleware.isUserByIdExists, userController.getUserById);

router.put('/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserObjectValid,
    userMiddleware.isUserByIdExists,
    userController.updateUser);

router.delete('/:userId', userMiddleware.isUserIdValid, userMiddleware.isUserByIdExists, userController.deleteUser);

module.exports = router;
