DROP DATABASE IF EXISTS tracker;
CREATE DATABASE tracker;
USE tracker;
CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(30),
    PRIMARY KEY(id)
    );
CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30),
	salary DECIMAL(10, 2),
	department_id INT,
	INDEX dep_ind (department_id),
    PRIMARY KEY(id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);



