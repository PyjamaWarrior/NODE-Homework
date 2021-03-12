const Joi = require('joi');

const { regExpEnum } = require('../../constant');

module.exports = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(255),
    lastName: Joi.string().alphanum().min(2).max(255),
    email: Joi.string().regex(regExpEnum.EMAIL_REGEXP)
});
