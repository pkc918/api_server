const Joi = require("joi");

exports.login_schema = {
    body: {
        username: Joi.string().pattern(/^[\S\u4e00-\u9fa5]{1,10}$/).required(),
        password: Joi.string().pattern(/^[\S]{6,18}$/).required()
    }
};

exports.userInfo_schema = {
    body: {
        id: Joi.number().integer().min(1).required(),
        nickname: Joi.string().pattern(/^[\S\u4e00-\u9fa5]{1,8}$/),
        email: Joi.string().email()
    }
};

exports.update_password = {
    body: {
        id: Joi.number().integer().min(1).required(),
        oldPassword: Joi.string().pattern(/^[\S]{6,18}$/).required(),
        newPassword: Joi.string().pattern(/^[\S]{6,18}$/).required()
    }
};

exports.update_avatar = {
    body: {
        avatar: Joi.string().dataUri().required()
    }
}
