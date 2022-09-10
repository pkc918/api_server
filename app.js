const express = require("express");
const {expressjwt: JWT} = require("express-jwt");
const {jwtSecretKey} = require("./config");
const app = express();
const cors = require("cors");// cors 中间件
const joi = require("joi");
const userRouter = require("./router/user"); // 导入用户路由模块
const userinfoRouter = require("./router/userinfo"); // 导入用户信息路由模块
const artcateRouter = require("./router/artcate");

// 中间件
app.use(cors()); // 注册为全局可用中间件

// 只能解析 application/x-www-form-urlencoded 格式的表数据
app.use(express.urlencoded({extended: false}));

// 指令哪些接口不需要 token 身份认证
app.use(JWT({secret: jwtSecretKey, algorithms: ["HS256"]}).unless({path: [/^\/api\//]}));

// 做返回前的数据处理
app.use((req, res, next) => {
    res.beforeSend = (message, status = 200) => {
        res.send({
            status,
            message: message instanceof Error ? message.message : message
        });
    };
    next();
});
app.use("/api", userRouter);
app.use("/own", userinfoRouter);
app.use("/own/article", artcateRouter);

// 捕获错误的中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res?.send({status: 412, message: err?.message});
    if (err?.name === "UnauthorizedError") {
        return res?.send({
            status: 401,
            message: "invalid token..."
        });
    } else {
        next(err);
    }
});

app.listen(9000, () => {
    console.log("blogApi running at http://127.0.0.1:9000");
});
