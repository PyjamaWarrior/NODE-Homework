const { O_Auth } = require('../dataBase/models-mongo');

module.exports = {
    findTokens: token => O_Auth.findOne(token),

    createTokens: tokensObject => O_Auth.create(tokensObject),

    deleteTokens: tokensObject => O_Auth.deleteOne(tokensObject)
};
