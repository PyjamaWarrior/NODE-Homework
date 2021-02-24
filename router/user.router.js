const router = require('express').Router();

const userMiddleware = require('../middleware/user.middleware');
const userController = require('../controller/user.controller');

router.get('/', userController.getUsers);

// router.get('/:username', userController.getUserByUsername); закоментовано, бо зробив аналог через query в методі вище

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.delete('/:userId', userMiddleware.isUserIdValid, userController.deleteUser);

module.exports = router;
