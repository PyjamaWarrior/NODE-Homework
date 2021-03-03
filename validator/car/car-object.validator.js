const Joi = require('joi');

module.exports = Joi.object({
    manufacturer: Joi.string().max(255).required(),
    model: Joi.string().max(255).required()
});
