const express = require("express")
const cors = require("cors") // cors 中间件
const app = express();

// 中间件
app.use(cors()) // 注册为全局可用中间件
// 只能解析 application/x-www-form-urlencoded 格式的表数据
app.use(express.urlencoded({extended: false}))


app.listen(9000, () => {
    console.log("blogApi running at http://127.0.0.1:9000");
})
