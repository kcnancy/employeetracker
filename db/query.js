const connection = require("./connection");

class ET {
    constructor(connection) {
        this.connection = connection;
      }

    //List all employees
    findAllEmployees() {
            return this.connection.query(
              "SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
            );
          }

    //List employees by department
    findAllDepartments() {
    return this.connection.query(
        "SELECT department.id, department_name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department_name"
        );
      }

    //List all employees by manager
    findAllEmployeesByManager(managerId) {
        return this.connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, department_name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
          managerId
        );
      }
    //add am employee
      createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
      }
    //update an employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [roleId, employeeId]
        );
      }

    //update an employee's manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [managerId, employeeId]
        );
      }

    //view all departments by department name
    findAllRoles() {
        return this.connection.query(
          "SELECT role.id, role.title, department_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
      }

    //find all by department id
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
          departmentId
        );
      }
    //create a new role
    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
      }


    //create a new department
    createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
    }

    //remove a department
    removeDepartment(departmentId) {
        return this.connection.query(
          "DELETE FROM department WHERE id = ?",
          departmentId
        );
      }

    //remove a role
    removeRole(roleId) {
        return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
      }
    }
    module.exports = new ET(connection);