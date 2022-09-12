const db = require("../db");
const path = require("path");

// 新增文章
exports.addArticle = (req, res) => {
    // 校验 req.file 数据
    if (!req.file || req.file.fieldname !== "cover_img") return res.beforeSend(`文章封面未上传!`, 402);
    const articleInfo = {
        ...req.body,
        cover_img: path.join("/uploads", req.file.filename), // 封面存放路径
        pub_date: new Date(), // 发布时间
        author_id: req.auth.id // 作者 id
    };
    db.query(
      `insert into ev_articles set ?`,
      [articleInfo],
      (err, result) => {
          if (err) return res.beforeSend(err, 502);
          if (result.affectedRows !== 1) return res.beforeSend(`发布失败!`, 502);
          return res.send({
              status: 201,
              message: `发布成功!`
          });
      }
    );
};

// 删除文章
exports.deleteArticleById = (req, res) => {
    // auth: req.auth.id   id: req.params.id
    db.query(
      `delete from ev_articles where id = ? && author_id = ?`,
      [req.params.id, req.auth.id],
      (err, result) => {
          if (err) return res.beforeSend(err, 502);
          if (result.affectedRows !== 1) return res.beforeSend(`删除文章失败!`, 502);
          return res.send({
              status: 200,
              message: `删除成功!`
          });
      }
    );
};
