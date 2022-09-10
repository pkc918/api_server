const Joi = require("joi");


exports.add_ArticleCate = {
    body: {
        alias: Joi.string().alphanum().required(),
        title: Joi.string().pattern(/^[\S\u4e00-\u9fa5]{1,4}$/).required()
    }
};
