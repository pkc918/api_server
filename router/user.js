const express = require("express");

const router = express.Router();

// 注册新用户
router.post("/register", (req, res) => {
    res.send(`register OK`);
});

// 用户登录
router.post("/login", (req, res) => {
    res.send("login OK");
});

// 导出路由
module.exports = router;
