SELECT first_name, last_name
FROM employee
INNER JOIN role ON employee.role_id = role.id;