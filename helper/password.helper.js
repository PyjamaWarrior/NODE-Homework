const bcrypt = require('bcrypt');

const { statusMessages } = require('../status-messages');

module.exports = {
    hash: password => bcrypt.hash(password, 12),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new Error(statusMessages.WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
