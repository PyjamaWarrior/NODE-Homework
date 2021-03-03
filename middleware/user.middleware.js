const { statusCodesEnum } = require('../constant');
const { userService } = require('../service');
const { statusMessages } = require('../status-messages');
const { commonValidators, userValidators } = require('../validator');

module.exports = {
    isUserSearchQueryValid: (req, res, next) => {
        try {
            const { error } = userValidators.userSearchQueryValidator.validate(req.query);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserByIdExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.getUserById(userId);

            if (!user) {
                throw new Error(statusMessages.CANT_FIND_USER);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isEmailTaken: async (req, res, next) => {
        try {
            const { email } = req.body;

            const users = await userService.getUsers({ email });

            if (users.length) {
                throw new Error(statusMessages.USER_ALREADY_CREATED);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserObjectValid: (req, res, next) => {
        try {
            const { error } = userValidators.userObjectValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { error } = commonValidators.mongodbIdValidator.validate(userId);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
