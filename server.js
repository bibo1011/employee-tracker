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

afterConnection = () => {
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
                'Update an employee role'
            ]
        }
    ])
    .then (answer => {
        switch (answer.options){
            case 'View all departments':
                readDepartment();
                break; 
        }
    })
};

readDepartment = () => {
    console.log('Selecting all department...\n')
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.log(res)
    });
    connection.end();
}
  