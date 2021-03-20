const Joi = require('joi');

module.exports = Joi.string().alphanum().length(24).required();
