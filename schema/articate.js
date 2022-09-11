const Joi = require("joi");


exports.add_ArticleCate = {
    body: {
        alias: Joi.string().alphanum().required(),
        title: Joi.string().pattern(/^[\S\u4e00-\u9fa5]{1,4}$/).required()
    }
};

exports.deleteArticleCate = {
    params: {
        id: Joi.number().integer().min(1).required()
    }
};

exports.getArticleCate = {
    params: {
        id: Joi.number().integer().min(1).required()
    }
}

exports.updateArticleCate = {
    body: {
        id: Joi.number().integer().min(1).required(),
        alias: Joi.string().alphanum().required(),
        title: Joi.string().pattern(/^[\S\u4e00-\u9fa5]{1,4}$/).required()
    }
}
