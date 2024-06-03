const fs = require("fs");
const json = fs.readFileSync("./db/option.json", "utf8");
const options = JSON.parse(json);
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.database,
    dateStrings: true,
});
module.exports = pool;