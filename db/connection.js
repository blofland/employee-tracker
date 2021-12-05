const mysql = require('mysql2');
function db(){

  return mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Blof5088!',
    database: 'employeetrack'
  });}

module.exports = db();