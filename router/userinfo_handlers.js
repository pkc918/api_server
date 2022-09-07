const db = require("../db/index");

// 获取用户信息
exports.getUserInfo = (req, res) => {
    db.query(
      `select id, username, nickname, password, user_pic, email from ev_users where id = ?`,
      [req.auth.id],
      (err, result) => {
          if (err) {
              return res.beforeSend(err, 502);
          }
          if (result.length !== 1) {
              return res.beforeSend(new Error(`获取信息失败!`), 502);
          }
          return res.send({
              message: `获取用户信息成功!`,
              data: result[0],
              status: 200
          });
      }
    );
};

// 更新用户信息
exports.updateUserInfo = (req, res) => {
    db.query(
      `update ev_users set ? where id = ?`,
      [req.body, req.body.id],
      (err, result) => {
          if (err) return res.beforeSend(err, 502);
          if (result.affectedRows !== 1) return res.beforeSend(`修改未成功!`, 502);
          return res.beforeSend(`修改用户信息成功!`, 200)
      }
    );
};
