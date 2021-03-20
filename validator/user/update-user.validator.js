const Joi = require('joi');

const { regExpEnum } = require('../../constant');

module.exports = Joi.object({
    age: Joi.number().integer().min(1),
    email: Joi.string().regex(regExpEnum.EMAIL_REGEXP),
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(255),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(255),
    _cars: Joi.array().items(Joi.string().alphanum().length(24))
});
