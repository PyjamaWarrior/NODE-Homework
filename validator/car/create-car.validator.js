const Joi = require('joi');

module.exports = Joi.object({
    color: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    manufacturer: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    model: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    price: Joi.number().positive().required()
});
