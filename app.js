const userRouter = require("./router/user"); // 导入用户路由模块
const express = require("express");
const app = express();
const cors = require("cors") // cors 中间件

// 中间件
app.use(cors()) // 注册为全局可用中间件
// 只能解析 application/x-www-form-urlencoded 格式的表数据
app.use(express.urlencoded({extended: false}))
//
app.use('/api', userRouter)

app.listen(9000, () => {
    console.log("blogApi running at http://127.0.0.1:9000");
})
