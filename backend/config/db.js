// const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//   host: "trolley.proxy.rlwy.net",
//   port: 40111,
//   user: "root",
//   password: "lWQEHHmpVDAjGHcILQYEEgYmwjQippKr",
//   database: "railway",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// console.log("Connected to Railway MySQL");

// module.exports = db;

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "", 
  database: "hmp_pos",
  waitForConnections: true,
  connectionLimit: 10,
});

console.log("Connected to LOCAL MySQL");

module.exports = db;