SELECT first_name, last_name, role_id, manager_id
FROM employee
    LEFT JOIN role ON employee.role_id = role.id;