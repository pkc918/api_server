const express = require("express");
const multer = require("multer");
const path = require("path");
const {schema_Handlers} = require("../schema/schema_Handlers");
const {addArticle, deleteArticleById} = require("../handlers/article_handlers");
const {add_article_schema, delete_Article_schema} = require("../schema/article")

const uploads = multer({dest: path.join(__dirname, "../uploads")});

const router = express.Router();
// 发布新文章
router.post("/add", uploads.single('cover_img'), schema_Handlers(add_article_schema), addArticle);
// 删除文章
router.get("/deleteArticle/:id", schema_Handlers(delete_Article_schema), deleteArticleById)

// 导出路由
module.exports = router;
