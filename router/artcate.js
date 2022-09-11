const express = require("express");
const router = express.Router();
const {schema_Handlers} = require("../schema/schema_Handlers");
const {add_ArticleCate, deleteArticleCate, getArticleCate} = require("../schema/articles");
const {getArticleCates, addArticleCate, deleteArticleCateById, getArticleCateById} = require("./artcate_handler");

// 获取文章分类路由
router.get("/cates", getArticleCates);
// 新增文章分类
router.post("/addcates", schema_Handlers(add_ArticleCate), addArticleCate);
// 删除文章分类
router.get("/deletecate/:id", schema_Handlers(deleteArticleCate), deleteArticleCateById);
// 获取文章分类数据
router.get("/cates/:id", schema_Handlers(getArticleCate), getArticleCateById)

module.exports = router;
