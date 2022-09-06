const userRouter = require("./router/user"); // 导入用户路由模块
const express = require("express");
const app = express();
const cors = require("cors"); // cors 中间件

// 中间件
const beforeSend = function (req, res, next) {
    /* status
    *   1：错误
    *   0：成功
    * */
    res.beforeSend = function (message, status = 1) {
        return res.send({
            status,
            message: message instanceof Error ? message.message : message
        });
    };
    next();
};
app.use(beforeSend); // 做返回前的数据处理

app.use(cors()); // 注册为全局可用中间件

// 只能解析 application/x-www-form-urlencoded 格式的表数据
app.use(express.urlencoded({extended: false}));
//
app.use("/api", userRouter);

app.listen(9000, () => {
    console.log("blogApi running at http://127.0.0.1:9000");
});
