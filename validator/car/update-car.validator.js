const Joi = require('joi');

module.exports = Joi.object({
    manufacturer: Joi.string().alphanum().min(2).max(255),
    model: Joi.string().alphanum().min(2).max(255),
    color: Joi.string().alphanum().min(2).max(255),
    price: Joi.number().positive()
});
