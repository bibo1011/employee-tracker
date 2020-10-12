
-- SELECT employee.id, employee.first_name as First_Name, employee.last_name as Last_Name, 
-- role.title as Title, department.name as Department, role.salary as Salary, 
-- employee.manager_id as Manager
-- FROM employee
-- INNER JOIN role ON employee.role_id=role.id
-- INNER JOIN department ON role.department_id=department.id

SELECT role.id, role.title as Title, department.name as Department, role.salary as Salary 
FROM role 
INNER JOIN department ON role.department_id=department.id