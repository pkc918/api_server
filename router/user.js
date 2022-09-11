const express = require("express");
const userHandlers = require("../handlers/user_handlers");
const {schema_Handlers} = require("../schema/schema_Handlers");
const {login_schema} = require("../schema/user");

const router = express.Router();
// 注册新用户
router.post("/register", schema_Handlers(login_schema), userHandlers.registerUser);
// 用户登录
router.post("/login", schema_Handlers(login_schema),userHandlers.login);

// 导出路由
module.exports = router;
