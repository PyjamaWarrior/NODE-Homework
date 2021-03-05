const { statusCodesEnum } = require('../constant');
const { passwordHasher } = require('../helper');
const { userService } = require('../service');
const { statusMessages } = require('../status-messages');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await userService.getUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { body, body: { password } } = req;

            const hasPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...body, password: hasPassword });

            res.status(statusCodesEnum.CREATED).json(statusMessages.USER_CREATED);
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { body, params: { userId } } = req;

            await userService.updateUser(userId, body);

            res.json(statusMessages.USER_UPDATED);
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.deleteUser(userId);

            res.json(statusMessages.USER_DELETED);
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
