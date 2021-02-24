const userService = require('../service/user.service');
const statusCodes = require('../constant/statusCodes.enum');
const successMessages = require('../status-messages/success.messages');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const {body: {prefLang = 'en'}, query} = req;

            const users = await userService.getUsers(query, prefLang);

            res.json(users);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },
    // закоментовано, бо зробив аналог через query в методі вище
    // getUserByUsername: async (req, res) => {
    //     try {
    //         const {params: {username}, body: {prefLang = 'en'}} = req;
    //
    //         const user = await userService.getUserByUsername(username, prefLang);
    //
    //         res.json(user);
    //     } catch (e) {
    //         res.status(statusCodes.BAD_REQUEST).json(e.message);
    //     }
    // },
    createUser: async (req, res) => {
        try {
            const {body, body: {prefLang = 'en'}} = req;

            await userService.createUser(body, prefLang);

            res.status(statusCodes.CREATED).json(successMessages.USER_CREATED[prefLang]);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {params: {userId}, body: {prefLang = 'en'}} = req;

            await userService.deleteUser(userId, prefLang);

            res.json(successMessages.USER_DELETED[prefLang]);
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
}
