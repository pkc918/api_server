const express = require("express");
const router = express.Router();
const {schema_Handlers} = require("../schema/schema_Handlers");
const {add_ArticleCate, deleteArticleCate, getArticleCate, updateArticleCate} = require("../schema/articles");
const {getArticleCates, addArticleCate, deleteArticleCateById, getArticleCateById, updateArticleCateById} = require("../handlers/artcate_handler");

// 获取文章分类路由
router.get("/cates", getArticleCates);
// 新增文章分类
router.post("/addcates", schema_Handlers(add_ArticleCate), addArticleCate);
// 删除文章分类
router.get("/deletecate/:id", schema_Handlers(deleteArticleCate), deleteArticleCateById);
// 获取文章分类数据
router.get("/cates/:id", schema_Handlers(getArticleCate), getArticleCateById)
// 修改文章分类数据
router.post("/updatecate", schema_Handlers(updateArticleCate), updateArticleCateById)

module.exports = router;
