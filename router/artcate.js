const express = require("express");
const router = express.Router();
const {schema_Handlers} = require("../schema/schema_Handlers");
const {add_ArticleCate} = require("../schema/articles");
const {getArticleCates, addArticleCate} = require("./artcate_handler");

// 获取文章分类路由
router.get("/cates", getArticleCates);
// 新增文章分类
router.post("/addcates", schema_Handlers(add_ArticleCate), addArticleCate);


module.exports = router;
