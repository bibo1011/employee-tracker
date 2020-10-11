const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Font = require('ascii-art-font');

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
    connection.query('SELECT role.id, role.title as Title, role.department_id as Department, role.salary as Salary FROM role INNER JOIN department ON role.department_id=department.id', function (err, res) {
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
    // console.log('')
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter name of department:'
        }
    ])
    .then (add => {
        // console.log(add.department);
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
            message: 'Enter salary for the role:'
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Enter department for the role:'
        }
    ])
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
}

// async function updateRole() {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'upRole'
//             message: ''
//         }
//     ])
// }

async function exit() {
    connection.end();
}
  