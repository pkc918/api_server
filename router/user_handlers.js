const db = require("../db/index");
exports.registerUser = (req, res) => {
    const checkUserName = /^[\w\u4e00-\u9fa5]{1,10}$/;
    const checkPassword = /^\w{6,18}$/;
    const {username, password} = req.body;
    // 当用户名或者密码为空
    if (!username || !password) {
        return res.send({
            status: 1, message: "用户名或者密码不能为空！"
        });
    }
    // 判断用户名和密码满足要求
    if (!checkUserName.test(username.trim()) || !checkPassword.test(password.trim())) {
        return res.send({
            status: 1, message: "用户名(1-10位)或者密码(6-18位)不满足条件！"
        });
    }
    // 判断该是否已经创建
    db.query(`select * from ev_users where username=?`, [username], ((err, result) => {
        if (err) {
            return res.send({
                message: err.message,
                status: 1
            });
        }
        if (result.length > 0) {
            return res.send({
                message: "用户已被占用!",
                status: 1
            });
        }
    }));
};

exports.login = (req, res) => {
    res.send("login OK");
};
