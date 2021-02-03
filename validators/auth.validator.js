const Joi = require('joi');
const { EMAIL, PASSWORD } = require('../configs/regex.enum');

module.exports = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL)
        .min(8)
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD)
});
