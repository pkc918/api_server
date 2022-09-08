const db = require("../db/index");
const {compareSync, hashSync} = require("bcryptjs");

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
          return res.beforeSend(`修改用户信息成功!`, 200);
      }
    );
};

// 修改密码
exports.updatePassword = (req, res) => {
    db.query(
      `select * from ev_users where id = ?`,
      [req.body.id],
      (err, result) => {
          if (err) return res.beforeSend(err, 501);
          if (result.length !== 1) return res.beforeSend(`修改密码失败`, 502);
          // 判断 旧密码（明文）是否与数据库中密码(加密过得)相等
          if (!compareSync(req.body.oldPassword, result[0].password)) {
              return res.beforeSend(`原密码错误`, 400);
          }
          db.query(
            `update ev_users set password = ? where id = ?`,
            [hashSync(req.body.newPassword, 10), req.body.id],
            (err, result) => {
                if (err) return res.beforeSend(err, 502);
                if (result.affectedRows !== 1) return res.beforeSend(`修改密码失败`, 502);
                return res.beforeSend(`修改密码成功!`, 200);
            }
          );
      }
    );
};

// 更新头像
exports.updateAvatar = (req, res) => {
    db.query(
      `update ev_users set user_pic = ? where id = ?`,
      [req.body.avatar, req.body.id],
      (err, result) => {
          if (err) return res.beforeSend(err, 502);
          if (result.affectedRows !== 1) return res.beforeSend(`更新头像失败!`, 502);
          return res.beforeSend(`更换头像成功!`, 200);
      }
    );
};
