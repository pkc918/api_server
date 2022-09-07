const express = require("express");
const {schema_Handlers} = require("../schema/schema_Handlers");
const {getUserInfo, updateUserInfo,updatePassword} = require("./userinfo_handlers");
const {userInfo_schema, update_password} = require("../schema/user");


const router = express.Router();
// 获取用户基本信息
router.get("/userinfo", getUserInfo);
// 更新用户基本信息
router.post("/userinfo", schema_Handlers(userInfo_schema), updateUserInfo);
// 修改密码
router.post("/update_password", schema_Handlers(update_password), updatePassword)

// 导出路由
module.exports = router;
