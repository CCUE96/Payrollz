const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database:"payroll_db"
});


function mainMenu() {
inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'View All Roles',
            'View All Departments',
            'Add Role',
            'Add Department',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'Exit'
        ]
    }
]).then(answers => {
    console.log(answers);
    switch (answers.action) {
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'View All Employees By Department':
            viewAllEmployeesByDepartment();
            break;
        case 'View All Employees By Manager':
            viewAllEmployeesByManager();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Remove Employee':
            removeEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'Update Employee Manager':
            updateEmployeeManager();
            break;
        case 'Exit':
            db.end();
            console.log('Goodbye');
            break;
        default:'Invalid choice'
        break;
    }
});
}
function viewAllEmployees() {
    const query = `
        SELECT employees.id, employees.first_name, employees.last_name, role.title AS role,role.salary As salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employees
        LEFT JOIN role ON employees.role_id = role.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id
    `;

    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewAllEmployeesByDepartment() {
    const query = `
        SELECT employees.id, employees.first_name, employees.last_name, role.title AS role, department.name AS department
        FROM employees
        LEFT JOIN role ON employees.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
    `;

    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewAllEmployeesByManager() {
    db.query('SELECT * FROM employees WHERE manager_id IS NOT NULL', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewAllRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role average salary'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter department id'
        }
    ]).then(answers => {
                db.query('INSERT INTO role SET ?', answers, (err) => {
                    if (err) throw err;
                    console.log('Role added');
                    mainMenu();
                });
            });
        }

        function addDepartment() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter department name'
                }
            ]).then(answers => {
                db.query('INSERT INTO department SET ?', answers, (err) => {
                    if (err) throw err;
                    console.log('Department added');
                    mainMenu();
                });
            });
        }

        function addEmployee() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter first name'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter last name'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter role id'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Enter manager id'
                }
            ]).then(answers => {
                db.query('INSERT INTO employees SET ?', answers, (err) => {
                    if (err) throw err;
                    console.log('Employee added');
                    mainMenu();
                });
            });
        }

function removeEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee id'
        }
    ]).then(answers => {
        db.query('DELETE FROM employees WHERE id = ?', answers.id, (err, res) => {
            if (err) throw err;
            console.log('Employee removed');
            mainMenu();
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee id'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter role id'
        }
    ]).then(answers => {
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [answers.role_id, answers.id], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated');
            mainMenu();
        });
    });
}

function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee id'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter manager id'
        }
    ]).then(answers => {
        db.query('UPDATE employees SET manager_id = ? WHERE id = ?', [answers.manager_id, answers.id], (err, res) => {
            if (err) throw err;
            console.log('Employee manager updated');
            mainMenu();
        });
    });
}


figlet('Payrollz', (err, data) => {
    if (err) throw err;
    console.log(chalk.magenta(data));
    mainMenu();
});


