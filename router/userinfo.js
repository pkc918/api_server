const express = require("express");
const {getUserInfo} = require("./userinfo_handlers");

const router = express.Router();
// 获取用户基本信息
router.get("/userinfo", getUserInfo);

// 导出路由
module.exports = router;
