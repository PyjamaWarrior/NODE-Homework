const { statusCodesEnum } = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { passwordHasher } = require('../helper');
const { userService } = require('../service');
const { statusMessages } = require('../status-messages');
const { commonValidators, userValidators } = require('../validator');

module.exports = {
    isUserExists: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.getSingleUser({ email }).select('+password');

            if (!user) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, statusMessages.RECORD_NOT_FOUND.customCode);
            }

            await passwordHasher.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.getUserById(userId).populate('_cars');

            if (!user) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, statusMessages.RECORD_NOT_FOUND.customCode);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailTaken: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.getSingleUser({ email });

            if (user) {
                throw new ErrorHandler(statusCodesEnum.CONFLICT, statusMessages.RECORD_ALREADY_EXISTS.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserAuthorized: (req, res, next) => {
        try {
            const { params: { userId }, user: { _id } } = req;

            if (userId !== _id.toString()) {
                throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, statusMessages.UNAUTHORIZED.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    onUserCreate: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

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
    },

    onUserUpdate: (req, res, next) => {
        try {
            const { error } = userValidators.updateUserValidator.validate(req.body);

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
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { error } = commonValidators.mongodbIdValidator.validate(userId);

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
