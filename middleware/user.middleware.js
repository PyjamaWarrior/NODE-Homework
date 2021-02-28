const statusCodes = require('../constant/statusCodes.enum');
const statusMessages = require('../status-messages/stastus.messages');

module.exports = {
    isUserObjectValid: (req, res, next) => {
        try {
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;
            const {
                firstName,
                lastName,
                age,
                email,
                password
            } = req.body;

            if (firstName.length > 255 || typeof firstName !== 'string') {
                throw new Error(statusMessages.INVALID_FIRSTNAME);
            }

            if (lastName.length > 255 || typeof lastName !== 'string') {
                throw new Error(statusMessages.INVALID_LASTNAME);
            }

            if (age <= 0 || !Number.isInteger(age) || Number.isNaN(age)) {
                throw new Error(statusMessages.INVALID_AGE);
            }

            if (!email.match(emailRegex)) {
                throw new Error(statusMessages.INVALID_EMAIL);
            }

            if (!password.match(passwordRegex)) {
                throw new Error(statusMessages.WEAK_PASSWORD);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },
    isUserIdValid: (req, res, next) => {
        try {
            const idRegex = /^[a-f\d]{24}$/i;
            const { userId } = req.params;

            if (!userId.match(idRegex)) {
                throw new Error(statusMessages.NOT_VALID_ID);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
};
