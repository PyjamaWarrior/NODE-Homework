const jwt = require('jsonwebtoken');

const { constants } = require('../constant');
const { authService } = require('../service');
const { statusMessages } = require('../status-messages');
const { userValidators } = require('../validator/index');

module.exports = {
    checkToken: (tokenType, jwtSecretWord) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new Error(statusMessages.TOKEN_REQUIRED);
            }

            jwt.verify(token, jwtSecretWord, err => {
                if (err) {
                    throw new Error(statusMessages.INVALID_TOKEN);
                }
            });

            const tokens = await authService.findTokens({ [tokenType]: token }).populate('_user_id');

            if (!tokens) {
                throw new Error(statusMessages.INVALID_TOKEN);
            }

            req.user = tokens._user_id;
            req.token = token;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkAuthData: (req, res, next) => {
        try {
            const { error } = userValidators.userAuthDataValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
