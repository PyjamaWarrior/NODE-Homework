const { tokenator } = require('../helper');
const { authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const tokens = tokenator();

            await authService.createTokens({ ...tokens, _user_id: _id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        try {
            const { token, user: { _id } } = req;
            const tokens = tokenator();

            await authService.deleteTokens({ refresh_token: token });

            await authService.createTokens({ ...tokens, _user_id: _id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
