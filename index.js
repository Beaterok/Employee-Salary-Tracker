const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
// const process = require('process')
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pass123',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

const init = async() => {
     await inquirer.prompt([
        {
            type: 'list',
            name: 'init',
            message: 'What would you like to do?',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        },
    ]).then((answer) => {
        if (answer.init === "View All Employees") {
            return viewAllEmployees()
        }
        if (answer.init === "Add Employee") {
            return addEmployee()
        }
        if (answer.init === "Update Employee Role") {
            return updateEmployeeRole()
        }
        if (answer.init === "View All Roles") {
            return viewAllRoles()
        }
        if (answer.init === "Add Role") {
            return addRole()
        }
        if (answer.init === "View All Departments") {
            return viewAllDepartments()
        }
        if (answer.init === "Add Department") {
            return addDepartment()
        }
        if (answer.init === "Quit") {
            return quit()
        }
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
       // console.log("test");
        init()

    });
}


init();