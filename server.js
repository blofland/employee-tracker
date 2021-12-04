const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const app = express()

// Connect to database
const db = require('./db/connection');



app.use("/api/employees", (req, res) => {
 db.query(`SELECT * FROM employee`, (err, rows) => {
    res.send(rows);
 })
})
 app.use("/api/departments", (req, res) => {
  db.query(`SELECT * FROM department`, (err, rows) => {
     res.send(rows);
  }) 
 })
app.use("/api/roles", (req, res) => {
  db.query(`SELECT * FROM role`, (err, rows) => {
     res.send(rows);
  })
 })

 // Get a single candidate
app.get('/api/employees/:id', (req, res) => {
  const sql = `SELECT * FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a candidate
app.delete('/api/employees/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create an employee
const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
              VALUES (?,?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1, 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});



app.listen (3001, () => {
  console.log("listening on port 3001")
} ) 

// Update a candidate's party
app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE employee SET party_id = ? 
               WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});