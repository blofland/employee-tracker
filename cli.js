const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const ctable = require('console.table')
// Connect to database
 const db = require('./db/connection');
const inquirer = require('inquirer')

async function getDepartments() {
    const sql = "SELECT id, name FROM department"
   const [departments] = await db.promise().query(sql)
   console.table(departments)
   console.log()
}

async function getRoles() {
    const sql = "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON department_id = department.id"
    const [rows] = await db.promise().query(sql)
    console.table(rows)
    console.log()
}

async function getEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary, manager.first_name AS manager
    FROM employee 
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    Join (SELECT * FROM employee) manager ON employee.role_id = manager.id
`
    const [rows] = await db.promise().query(sql)
    console.table(rows)
    console.log()
}
async function mainMenu(){
    const options = ["View all departments", "View all roles", "View all employees", "Exit"]
    const answers = await inquirer.prompt({
        type: "list",
        name: "main",
        choices: options   })
        switch(answers.main){
            case options[0]:
                await getDepartments()
                mainMenu()
                break;
            case options[1]:
                await getRoles()
                mainMenu()
                break;
            case options[2]:
                await getEmployees()
                mainMenu()
                break;
            default:
                console.log("exited program")
                console.log("Press ctrl C to log off :)")
                break;
        }
        
}
mainMenu()