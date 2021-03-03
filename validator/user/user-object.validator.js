const Joi = require('joi');

const { regExpEnum } = require('../../constant');

module.exports = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    age: Joi.number().integer().min(1),
    email: Joi.string().regex(regExpEnum.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regExpEnum.PASSWORD_REGEXP).required(),
    _cars: Joi.array().items(
        Joi.string().alphanum().length(24)
    )
});
