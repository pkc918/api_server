const db = require("../db/index");

exports.getArticleCates = (req, res) => {
    db.query(
      `select * from ev_article_cate where is_delete = 0 order by id asc`,
      (err, result) => {
          if (err) return res.beforeSend(err, 502);
          return res.send({
              data: result,
              message: "获取文章标签成功!",
              status: 200
          });
      }
    );
};
