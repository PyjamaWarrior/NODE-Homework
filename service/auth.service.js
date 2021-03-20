const { OAuth, User } = require('../dataBase/models');

module.exports = {
    createTokens: tokensObject => OAuth.create(tokensObject),

    getUserWithTokenPair: where => User.findOne({
        attributes: {
            exclude: 'password'
        },
        include: { model: OAuth, where }
    }),

    deleteTokens: tokensObject => OAuth.destroy({ where: tokensObject })
};
