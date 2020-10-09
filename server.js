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
    // Write a simple query that will SELECT everything from the 'products' table
    // Log the results in the console
    //
    // YOUR CODE HERE
    //
    // connection.query('SELECT * FROM employee', function (err, res) {
    //   if (err) throw err;
    //   console.log(results)
    //   }
    // );
    // connection.end();
};
  