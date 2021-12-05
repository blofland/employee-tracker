const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const ctable = require('console.table')
// Connect to database
const db = require('./db/connection');
const inquirer = require('inquirer')

async function getDepartments() {
    const sql = "SELECT id, name FROM department"
   const [departments] = await db.promise().query(sql)
   console.log(departments)
}

getDepartments()