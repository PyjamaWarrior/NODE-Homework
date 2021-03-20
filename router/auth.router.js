const router = require('express').Router();

const { JWT_REFRESH_SECRET } = require('../config/config');
const { constants: { REFRESH_TOKEN } } = require('../constant');
const { authController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.post('/', authMiddleware.checkAuthData, userMiddleware.isUserExists, authController.authUser);

router.post('/refresh', authMiddleware.checkToken(REFRESH_TOKEN, JWT_REFRESH_SECRET), authController.refreshTokens);

module.exports = router;
