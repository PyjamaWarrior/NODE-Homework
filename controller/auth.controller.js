const { tokenator } = require('../helper');
const { authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { id } = req.user;
            const tokens = tokenator();

            await authService.createTokens({ ...tokens, user_id: id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        try {
            const { token, user: { id } } = req;
            const tokens = tokenator();

            await authService.deleteTokens({ refresh_token: token });

            await authService.createTokens({ ...tokens, user_id: id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
