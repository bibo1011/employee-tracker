const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Font = require('ascii-art-font');
const Choice = require('inquirer/lib/objects/choice');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '123happy',
    database: 'employee_DB'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

const joinEmployee = "SELECT employee.id, employee.first_name as First_Name, employee.last_name as Last_Name,role.title as Title, department.name as Department, role.salary as Salary, employee.manager_id as Manager FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id"

async function afterConnection(){
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Choose your options:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then (answer => {
        switch (answer.options){
            case 'View all departments':
                readDepartments();
                break; 
            case 'View all roles':
                readRoles();
                break; 
            case 'View all employees':
                readEmployees();
                break; 
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break; 
            case 'Add an employee':
                addEmployee();
                break; 
            case 'Update an employee role':
                updateRole();
                break; 
            case 'Exit':
                exit();
        }
    })
};

async function readDepartments(){
    console.log('Selecting all departments...\n')
    connection.query('SELECT department.id, name as Department FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
}

async function readRoles(){
    console.log('Selecting all roles...\n')
    connection.query('SELECT role.id, role.title as Title, department.name as Department, role.salary as Salary FROM role INNER JOIN department ON role.department_id=department.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
}

async function readEmployees(){
    console.log('Selecting all employees...\n')
    connection.query(joinEmployee, function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
}

async function addDepartment(){
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter name of department:'
        }
    ])
    .then (add => {
        console.log('Adding new department...\n');
        connection.query('INSERT INTO department SET ?', 
        { 
            name: add.department 
        }, 
        function(err, res) {
            if (err) throw err;
            console.table(res.affectedRows);
            readDepartments();
        })
    })
}

async function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter name of the role:'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter salary for the role:',
            validate: input => {
                if (!isNaN(input)) {
                    return true;
                }
                return "Please enter a valid number."
            }
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Enter department for the role:',
            choices: [(1, 'Sales'),(2, 'Engineering'), (3, 'Finance'), (4, 'Legal')]
        }
    ])
    .then (add => {
        console.log(add.roleDepartment);
        console.log('Adding new role...\n');
        connection.query('INSERT INTO role SET ?', 
        { 
            title: add.roleName,
            salary: add.roleSalary,
            department_id: add.roleDepartment
        }, 
        function(err, res) {
            if (err) throw err;
            console.table(res.affectedRows);
            readRoles();
        })
    })
}

async function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee\'\s first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee\'\s last name:'
        },
        {
            type: 'input',
            name: 'empRole',
            message: 'Enter employee\'\s role:'
        },
        {
            type: 'input',
            name: 'empManager',
            message: 'Enter employee\'\s manager:'
        }
    ])
    .then (add => {
        console.log(add.firstName);
        console.log('Adding new employee...\n');
        connection.query('INSERT INTO employee SET ?', 
        { 
            first_name: add.firstName,
            last_name: add.lastName,
            role_id: add.empRole,
            manager_id: add.empManager
        }, 
        function(err, res) {
            if (err) throw err;
            console.table(res.affectedRows);
            readEmployee();
        })
    })
}

async function updateRole() {
    const choice = connection.query('SELECT id, first_name, last_name FROM employee')
    return inquirer.prompt([
        {
            type: 'list',
            name: 'upRole',
            message: 'Select an employee to update:',
            choices: [
                'a','b','c'
            ]
        }
    ])
    .then (update => {
        const query = connection.query('UPDATE employee SET ? WHERE ?', 
        { 
            role_id: update.upRole,
        },

        function(err, res) {
            if (err) throw err;
            console.table(res.affectedRows);
            // readEmployee();
        });
        console.log(query.sql)   
    })

}

async function exit() {
    connection.end();
}


  