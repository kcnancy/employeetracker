USE tracker;

INSERT INTO department
    (department_name)
VALUES
	('Sales'),
    ('Technology'),
    ('HumanResources'),
    ('Engineering');

INSERT INTO employee
	(first_name, last_name, role_id, manager_id)
VALUES
	('James', 'Price', 1, NULL),
    ('Andre', 'Thomas', 2, 1),
    ('Vicki', 'Johnson', 3, NULL),
    ('Cindy', 'Rae', 4, 3),
    ('Thad', 'Lee', 4, 3),
    ('Lisa', 'Mason', 5, NULL),
    ('Amanda', 'Cranker', 6, 5),
    ('Ripken', 'Homerson', 7, NULL),
    ('Rich', 'Wizard', 8, 7),
    ('Don', 'Adams', 9, 7);

INSERT INTO role
	(title, salary, department_id)
VALUES
	('Sales Manager', 150000.00, 1),
    ('Sales Representative', 100000.00, 1),
    ('Development Manager', 175000.00, 2),
    ('Development Staff', 130000.00, 2),
    ('Human Resources Manager', 110000.00, 3),
    ('Human Resources Analyst', 75000.00, 3),
    ('Engineering Manager', 170000.00, 4),
    ('Engineering Lead', 125000.00, 4),
    ('Junior Engineer', 95000.00, 4);

    -- SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name)
	-- AS manager FROM employee
    -- LEFT JOIN role ON (employee.role_id = role.id)
    -- LEFT JOIN department ON (role.department_id = department.id)
    -- LEFT JOIN employee manager ON (manager.id = employee.manager_id)
    -- ORDER BY employee.id;

 


