const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const process = require('process');
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Sa$ha19981m22',
        database: 'Employee_db'
    },
    console.log(`Connected to the Employee_db database.`)
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
        init()
    });
}

function addEmployee() {
    db.query('SELECT * FROM role', function (err, results) {
        const roleArr = results.map(({ department_id, title }) => ({
            name: title,
            value: department_id
        }))
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employees first name?',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees last name?',
            },
            {
                type: 'list',
                name: 'title',
                message: 'What is the employees role?',
                choices: roleArr,
            },
        ]).then((answers) => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id)
            VALUES (?,?,?)`;
            const params = [answers.first_name, answers.last_name, answers.role_id]

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                init()
            })
        })

    });
}


function updateEmployeeRole() {
    db.query('SELECT * FROM employee', function (err, results) {
        const employeeArr = results.map(({ id, title }) => ({
            name: title,
            value: title
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'title',
                message: 'What is the employees name you would like to update?',
                choices: employeeArr,
            },
            {
                type: 'input',
                name: 'role',
                message: 'What role would you like to set?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What salary would you like to set?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What id would you like to set?',
            },
        ]).then((answers) => {
            const sql = `UPDATE employee SET employee.role (role, salary, id)VALUES (?,?,?)`;
            const params = [answers.role, answers.salary, answers.id]

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                init()
            })
        })

    });
}


function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        init()
    });
}

// function to add role
function addRole() {
    db.query('SELECT * FROM department', function (err, results) {
        const departmentArr = results.map(({ id, department_name }) => ({
            name: department_name,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the department?',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What is the department that the new role belongs too?',
                choices: departmentArr,
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the department?',
            },
        ]).then((answers) => {
            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES (?,?,?)`;
            const params = [answers.title, answers.salary, answers.department_id]

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                init()
            })
        })

    });
}

// function to view department table
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init()
    });
}

// function to add a deparment to table
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the department?',
        }
    ]).then((answers) => {
        const sql = `INSERT INTO department (department_name)
        VALUES (?)`;
        const params = [answers.name];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            init()
        })
    })
}

function quit() {
    console.log('Goodbye')
    process.exit()
}

// calling initial function to run the initial inquirer
init();