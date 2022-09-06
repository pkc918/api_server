const Joi = require("joi");
// 对接收到的数据做一层校验
const schema_Handlers = function (schemas) {
    // allowUnknown 允许提交未定义的参数项
    // stripUnknown 过滤掉那些未定义的参数项
    return function (req, res, next) {
        ["body", "query", "params"].forEach(key => {
            if (schemas[key]) {
                const schema = Joi.object(schemas[key]);
                const {value, error} = schema.validate(req[key], {
                    allowUnknown: true,
                    stripUnknown: true
                });
                if (error) {
                    throw error;
                } else {
                    // 校验成功，将成功的结果重新赋值
                    req[key] = value;
                }
            }
        });
        next();
    };
};

exports.schema_Handlers = schema_Handlers;
