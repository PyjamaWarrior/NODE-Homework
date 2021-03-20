const bcrypt = require('bcrypt');

const { statusCodesEnum: { UNAUTHORIZED } } = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { WRONG_EMAIL_OR_PASSWORD } = require('../status-messages/status.messages');

module.exports = {
    hash: password => bcrypt.hash(password, 12),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new ErrorHandler(UNAUTHORIZED, WRONG_EMAIL_OR_PASSWORD.customCode);
        }
    }
};
