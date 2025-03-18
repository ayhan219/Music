const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.db_password,
  database: "music",
});
db.connect((err) => {
  if (err) {
    console.log("error while connecting to db", err);
  } else {
    console.log("connected to DB successfully");
  }
});

module.exports = db;
