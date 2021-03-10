const jwt = require('jsonwebtoken');

const { constants, statusCodesEnum } = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { authService } = require('../service');
const { statusMessages } = require('../status-messages');
const { userValidators } = require('../validator/index');

module.exports = {
    checkToken: (tokenType, jwtSecretWord) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, statusMessages.NO_TOKEN.customCode);
            }

            jwt.verify(token, jwtSecretWord, err => {
                if (err) {
                    throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, statusMessages.WRONG_TOKEN.customCode);
                }
            });

            const tokens = await authService.findTokens({ [tokenType]: token }).populate('_user_id');

            if (!tokens) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, statusMessages.RECORD_NOT_FOUND.customCode);
            }

            req.user = tokens._user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAuthData: (req, res, next) => {
        try {
            const { error } = userValidators.userAuthDataValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    statusCodesEnum.BAD_REQUEST,
                    statusMessages.JOI_VALIDATION_FAILED.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
