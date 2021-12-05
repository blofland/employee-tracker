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
    const sql = "SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON department_id = department.id"
    const [departments] = await db.promise().query(sql)
    console.table(departments)
    console.log()
}

async function mainMenu(){
    const options = ["View all departments", "View all roles", "Exit"]
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
            default:
                console.log("exited program")
                console.log("Press ctrl C to log off :)")
                break;
        }
        
}
mainMenu()