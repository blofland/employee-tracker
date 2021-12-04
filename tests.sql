SELECT employee.*, role.title
FROM employee
LEFT JOIN role ON employee.role_id = role.id;