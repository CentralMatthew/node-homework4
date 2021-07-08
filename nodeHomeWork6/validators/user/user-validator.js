const Joi = require('joi');

const { regexp } = require('../../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: Joi.string().required().min(2).max(40),
        email: Joi.string().regex(regexp.EMAIL_REGEXP).required(),
        password: Joi.string().regex(regexp.PASSWORD_REGEXP).required(),
        age: Joi.number().min(1).max(150),
        student: Joi.boolean()
    })
};
