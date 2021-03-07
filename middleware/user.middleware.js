const { statusCodesEnum } = require('../constant');
const { passwordHasher } = require('../helper');
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

    isUserExists: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.getSingleUser({ email });

            if (!user) {
                throw new Error(statusMessages.CANT_FIND_USER);
            }

            await passwordHasher.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserByIdExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.getUserById(userId);

            if (!user) {
                throw new Error(statusMessages.CANT_FIND_USER);
            }

            req.user = user;

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isEmailTaken: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.getSingleUser({ email });

            if (user) {
                throw new Error(statusMessages.USER_ALREADY_CREATED);
            }

            next();
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserAuthorized: (req, res, next) => {
        try {
            const { params: { userId }, user: { _id } } = req;

            if (userId !== _id.toString()) {
                throw new Error(statusMessages.UNAUTHORIZED);
            }

            next();
        } catch (e) {
            res.json(e.message);
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
