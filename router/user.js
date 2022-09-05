const express = require("express");
const userHandlers = require("./user_handlers");
const router = express.Router();

// 注册新用户
router.post("/register", userHandlers.registerUser);
// 用户登录
router.post("/login",userHandlers.login);

// 导出路由
module.exports = router;
