const { emailActionsEnum, statusCodesEnum } = require('../constant');
const { passwordHasher } = require('../helper');
const { mailService, userService } = require('../service');
const { statusMessages } = require('../status-messages');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { body, body: { email, firstName, password } } = req;

            const hasPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...body, password: hasPassword });

            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: firstName });

            res.status(statusCodesEnum.CREATED).json(statusMessages.RECORD_CREATED.customCode);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { body, params: { userId } } = req;

            await userService.updateUser(userId, body);

            res.json(statusMessages.RECORD_UPDATED.customCode);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const deletedUser = await userService.deleteUser(userId);

            const { email, firstName } = deletedUser;

            await mailService.sendMail(email, emailActionsEnum.DELETE_USER, { userName: firstName });

            res.json(statusMessages.RECORD_DELETED.customCode);
        } catch (e) {
            next(e);
        }
    }
};
