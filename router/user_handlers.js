const db = require("../db/index");
const {compareSync, hashSync} = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwtSecretKey, expiresIn} = require("../config");
// 注册
exports.registerUser = (req, res) => {
    let {username, password} = req.body;
    // 判断该是否已经创建
    db.query(
      `select * from ev_users where username=?`,
      [username],
      (err, result) => {
          if (err) {
              return res.beforeSend(err, 502);
          }
          if (result.length > 0) {
              return res.beforeSend(`用户名已被使用`, 502);
          }
          // 对密码加密
          password = hashSync(password, 10);
          // 可用的用户名和密码
          // 插入用户表
          db.query(
            `insert into ev_users(username, password) values(?,?)`,
            [username, password],
            (err, result) => {
                if (err) {
                    return res.beforeSend(err, 502);
                }
                // 影响行数为 1 行
                if (result.affectedRows !== 1) {
                    return res.beforeSend(`注册用户失败!`, 502);
                }
                return res.beforeSend(`注册成功`, 201);
            }
          );
      });
};

// 登录
exports.login = (req, res) => {
    const {username, password} = req.body;
    db.query(`select * from ev_users where username = ?`,
      [username],
      (err, result) => {
          if (err) {
              return res.beforeSend(err, 1);
          }
          if (result.length !== 1) {
              return res.beforeSend(`sql error`, 1);
          }
          const flag = compareSync(password, result[0]["password"]);
          if (!flag) return res.beforeSend(`密码有误，请重新登录!`, 1);
          const user = {...result[0], password: null, user_pic: null};
          const token = `Bearer ${jwt.sign(user, jwtSecretKey, {expiresIn})}`;
          return res.send({
              status: 0,
              token,
              message: `登录成功!`
          });
      });
};

