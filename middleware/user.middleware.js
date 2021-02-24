const statusCodes = require('../constant/statusCodes.enum');
const errorMessages = require('../status-messages/error.messages');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const {username, password, prefLang = 'en'} = req.body;

            if (!username || !password) {
                throw new Error(errorMessages.EMPTY_FIELD[prefLang]);
            }

            if (password.length < 6) {
                throw new Error(errorMessages.WEAK_PASSWORD[prefLang]);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },
    isUserIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const {prefLang = 'en'} = req.body;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessages.NOT_VALID_ID[prefLang]);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
}
