const express = require("express");
const userHandlers = require("./user_handlers");
const {schema_Handlers} = require("../schema/schema_Handlers");
const {schema} = require("../schema/user");

const router = express.Router();
// 注册新用户
router.post("/register", schema_Handlers(schema), userHandlers.registerUser);
// 用户登录
router.post("/login", schema_Handlers(schema),userHandlers.login);

// 导出路由
module.exports = router;
