const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1:9000",
    user: "root",
    password: "~123qwer",
    database: "my_db_01"
});

module.exports = db;
