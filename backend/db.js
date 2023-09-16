const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zarko123",
  database: "test",
});

module.exports = db;
