const express = require("express");
const multer = require("multer");
const path = require("path");
const {schema_Handlers} = require("../schema/schema_Handlers");
const {addArticle} = require("../handlers/article_handlers");
const {add_article_schema} = require("../schema/article")

const uploads = multer({dest: path.join(__dirname, "../uploads")});

const router = express.Router();
// 发布新文章
router.post("/add", uploads.single('cover_img'), schema_Handlers(add_article_schema), addArticle);

// 导出路由
module.exports = router;
