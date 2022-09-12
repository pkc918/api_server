const Joi = require("joi");

exports.add_article_schema = {
    body: {
        title: Joi.string().required(),
        cate_id: Joi.number().integer().min(1).required(),
        content: Joi.string().required().allow(""),
        state: Joi.string().valid("已发布", "草稿").required()
    }
};

exports.delete_article_schema = {
    params: {
        id: Joi.number().integer().min(1).required()
    }
};

exports.get_article_schema = {
    params: {
        id: Joi.number().integer().min(1).required()
    }
};
