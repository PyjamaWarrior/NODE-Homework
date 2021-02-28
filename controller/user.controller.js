const userService = require('../service/user.service');
const statusCodes = require('../constant/statusCodes.enum');
const statusMessages = require('../status-messages/stastus.messages');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await userService.getUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(statusCodes.CREATED).json(statusMessages.USER_CREATED);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { body, params: { userId } } = req;

            await userService.updateUser(userId, body);

            res.json(statusMessages.USER_UPDATED);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.deleteUser(userId);

            res.json(statusMessages.USER_DELETED);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
