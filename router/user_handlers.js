const db = require("../db/index");
const bcrypt = require("bcryptjs");
exports.registerUser = (req, res) => {
    let {username, password} = req.body;
    // 判断该是否已经创建
    db.query(
      `select * from ev_users where username=?`,
      [username],
      (err, result) => {
          if (err) {
              return res.beforeSend(err, 1);
          }
          if (result.length > 0) {
              return res.beforeSend(`用户名已被使用`, 1);
          }
          // 对密码加密
          password = bcrypt.hashSync(password, 10);
          // 可用的用户名和密码
          // 插入用户表
          db.query(
            `insert into ev_users(username, password) values(?,?)`,
            [username, password],
            (err, result) => {
                if (err) {
                    return res.beforeSend(err, 1);
                }
                // 影响行数为 1 行
                if (result.affectedRows !== 1) {
                    return res.beforeSend(`sql error`, 1);
                }
                return res.beforeSend(`注册成功`, 0);
            }
          );
      });
};

exports.login = (req, res) => {
    res.send("login OK");
};
