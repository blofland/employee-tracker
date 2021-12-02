const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const app = express()

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Blof5088!',
    database: 'employeetrack'
  },
  console.log('Connected to the employeetrack database.')
);

app.use("/api/employees", (req, res) => {
 db.query(`SELECT * FROM employee`, (err, rows) => {
    res.send(rows);
 })

})
app.use("/api/roles", (req, res) => {
  db.query(`SELECT * FROM role`, (err, rows) => {
     res.send(rows);
  })
 
 })

 app.use("/api/departments", (req, res) => {
  db.query(`SELECT * FROM department`, (err, rows) => {
     res.send(rows);
  })
 
 })

app.listen (3001, () => {
  console.log("listening on port 3001")
} ) 