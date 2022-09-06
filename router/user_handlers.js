const db = require("../db/index");
const bcrypt = require("bcryptjs");
exports.registerUser = (req, res) => {
    const checkUserName = /^[\w\u4e00-\u9fa5]{1,10}$/;
    const checkPassword = /^[\S]{6,18}$/;
    let {username, password} = req.body;
    // 当用户名或者密码为空
    if (!username || !password) {
        return res.beforeSend(`用户名或密码不能为空`, 1);
        // return res.send({
        //     status: 1, message: "用户名或者密码不能为空！"
        // });
    }
    // 判断用户名和密码满足要求
    if (!checkUserName.test(username.trim()) || !checkPassword.test(password.trim())) {
        return res.beforeSend(`用户名(1-10位)或者密码(6-18位)不满足条件！`, 1);
        // return res.send({
        //     status: 1, message: "用户名(1-10位)或者密码(6-18位)不满足条件！"
        // });
    }
    // 判断该是否已经创建
    db.query(
      `select * from ev_users where username=?`,
      [username],
      (err, result) => {
          if (err) {
              return res.beforeSend(err, 1);
              // return res.send({
              //     message: err.message,
              //     status: 1
              // });
          }
          if (result.length > 0) {
              return res.beforeSend(`用户名已被使用`, 1);
              // return res.send({
              //     message: "用户已被占用!",
              //     status: 1
              // });
          }
          // 可用的用户名和密码
          password = bcrypt.hashSync(password, 10);
          // 插入用户表
          db.query(
            `insert into ev_users(username, password) values(?,?)`,
            [username, password],
            (err, result) => {
                if (err) {
                    return res.beforeSend(err, 1);
                    // return res.send({
                    //     status: 1, message: err.message
                    // });
                }
                // 影响行数为 1 行
                if (result.affectedRows !== 1) {
                    return res.beforeSend(`sql error`, 1);
                    // return res.send({
                    //     status: 1, message: ""
                    // });
                }
                return res.beforeSend(`注册成功`, 0);
                // res.send({
                //     status: 0,
                //     message: "注册成功!"
                // });
            }
          );
      });
};

exports.login = (req, res) => {
    res.send("login OK");
};
