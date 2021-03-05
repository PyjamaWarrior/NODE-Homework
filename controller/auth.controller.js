const { tokenator } = require('../helper');
const { authService } = require('../service');
// const { statusMessages } = require('../status-messages');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { _id } = req.user;
            const tokens = tokenator();

            await authService.createTokens({ ...tokens, _user_id: _id });

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    },

    refreshTokens: async (req, res) => {
        try {
            const { token, user: { _id } } = req;
            const tokens = tokenator();

            await authService.deleteTokens({ refresh_token: token });

            await authService.createTokens({ ...tokens, _user_id: _id });

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }
};
