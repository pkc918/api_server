const express = require("express");
const router = express.Router();
const {getArticleCates} = require("./artcate_handler");

// 获取文章分类路由
router.get("/cates", getArticleCates);


module.exports = router;
