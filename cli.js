const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const ctable = require('console.table')
// Connect to database
 const db = require('./db/connection');
const inquirer = require('inquirer');
const { addSnapshotSerializer } = require('expect');

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
    JOIN (SELECT id, first_name, last_name FROM employee) manager ON employee.manager_id = manager.id
`
    const [rows] = await db.promise().query(sql)
    console.table(rows)
    console.log()
}

async function addDepartment() {
    const {department} = await inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "department"
         })
    const sql = `INSERT INTO department (name) VALUES (?)`
    try{
        await db.promise().execute(sql, [`${department}`])
        console.log() 
        console.log("Created new department - ", department)   
        console.log() 
    } catch(err){
        console.log(err)
    }
}

async function addRole() {
    let [departments] = await db.promise().query("SELECT name, id FROM department")
        departments = departments.reduce((obj, d) =>{
            const {name, id} = d 
            obj[name] = id
            return obj
        }, {})
    const answers = await inquirer.prompt([{
        type: "input",
        message: "What is the role title?",
        name: "title"
         },
        {
            type: "number",
            message: "What is the salary?",
            name: "salary"
            },
        {
            type: "list",
            message: "What is the department for this role?",
            choices: Object.keys(departments),
            name: "department"
        }
    ])
    const sql =  "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)"
    await db.promise().execute(sql, [answers.title, answers.salary, departments[answers.department]])
}

async function addEmployee(){
    let [roles] = await db.promise().query("SELECT title, id FROM role")
    roles = roles.reduce((obj, d) =>{
        const {title, id} = d 
        obj[title] = id
        return obj
    }, {}) 

    let [employees] = await db.promise().query("SELECT id, first_name, last_name FROM employee")
    employees = employees.reduce((obj, e) => {
        const {id, first_name, last_name} = e 
        obj[`${first_name} ${last_name}`] = id 
        return obj
    }, {
        "No manager": null 
    })



    const {first, last, role, manager} = await inquirer.prompt([
        {
            type: "input",
            message: "What is their first name?",
            name: "first"
        },
        {   
            type: "input",
            message: "What is their last name?",
            name: "last"
        },
        {
            type: "list",
            message: "What is their role?",
            choices: Object.keys(roles),
            name: "role"
        },
        {   
            type: "list",
            message: "What is the manager's Name?",
            choices: Object.keys(employees),
            name: "manager" 

        }
    ])
    
    console.log({
        manager: employees[manager]
    })

    try {
        const sql =  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)"
        const alt = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)"
        if(employees[manager])await db.promise().execute(sql, [first, last, roles[role], employees[manager]])
        else await db.promise().execute(alt, [first, last, roles[role]])
        
    } catch (err){
        console.log(err)
    }
    
    
}

async function mainMenu(){
    const options = ["View all departments", "View all roles", "View all employees", "Add Department", "Add Role", "Add Employee", "Exit"]
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
            case options[3]:
                await addDepartment()
                mainMenu()
                break;
            case options[4]:
                await addRole()
                mainMenu()
                break;
            case options[5]:
                await addEmployee()
                mainMenu()
                break;
            default:
                console.log("exited program")
                // console.log("Press ctrl C to log off :)")
                process.exit(1)
                break;
        }
        
}
mainMenu()