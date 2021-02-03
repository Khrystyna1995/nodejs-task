const Joi = require('joi');

const {
    NAME, EMAIL, PASSWORD, PHONE
} = require('../configs/regex.enum');

module.exports = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    name: Joi.string()
        .regex(NAME)
        .min(3)
        .max(15)
        .required(),
    email: Joi.string()
        .regex(EMAIL)
        .required(),
    password: Joi.string()
        .regex(PASSWORD),
    phone: Joi.number()
        .regex(PHONE)
        .integer()
        .min(12)

});
