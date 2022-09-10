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

exports.addArticleCate = (req, res) => {
    const values = [req.body.title, req.body.alias];
    db.query(
      `select name, alias from ev_article_cate where name = ? || alias = ?`,
      values,
      (err, result) => {
          if (err) return res.beforeSend(err, 502);
          if (result.length > 0) return res.beforeSend(`标签已存在!`, 502);
          db.query(
            `insert into ev_article_cate(name, alias) values(?, ?)`,
            values,
            (err, result) => {
                if (err) return res.beforeSend(err, 502);
                if (result.affectedRows !== 1) return res.beforeSend(`添加标签失败!`, 502);
                return res.send({
                    status: 201,
                    message: `创建成功!`
                });
            }
          );
      }
    );

};
