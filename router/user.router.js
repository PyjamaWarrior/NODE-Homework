const router = require('express').Router();

// const { JWT_SECRET } = require('../config/config');
// const { constants } = require('../constant');
const { userController } = require('../controller');
const { fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getUsers);

router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.onUserCreate,
    userMiddleware.isEmailTaken,
    userController.createUser);

router.use('/:userId',
//     authMiddleware.checkToken(constants.ACCESS_TOKEN, JWT_SECRET),
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExists,
    userMiddleware.isUserAuthorized);

router.get('/:userId', userController.getUserById);

router.put('/:userId',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.onUserUpdate,
    userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
