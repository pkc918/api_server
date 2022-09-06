const Joi = require('joi');

exports.schema = {
    body: {
        username: Joi.string().alphanum().min(1).max(10).required(),
        password: Joi.string().pattern(/^[\S]{6,18}$/).required()
    }
}
