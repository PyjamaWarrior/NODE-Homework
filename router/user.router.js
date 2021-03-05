const router = require('express').Router();

const { JWT_SECRET } = require('../config/config');
const { constants } = require('../constant');
const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.get('/', userMiddleware.isUserSearchQueryValid, userController.getUsers);

router.post('/', userMiddleware.isUserObjectValid, userMiddleware.isEmailTaken, userController.createUser);

router.use('/:userId',
    authMiddleware.checkToken(constants.ACCESS_TOKEN, JWT_SECRET),
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExists,
    userMiddleware.isUserAuthorized);

router.get('/:userId', userController.getUserById);

router.put('/:userId', userMiddleware.isUserObjectValid, userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
