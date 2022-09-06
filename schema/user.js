const Joi = require('joi');

exports.schema = {
    body: {
        username: Joi.string().pattern(/^[\S\u4e00-\u9fa5]{1,10}$/).required(),
        password: Joi.string().pattern(/^[\S]{6,18}$/).required()
    }
}
