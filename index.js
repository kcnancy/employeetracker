const mysql = require("mysql");
const { prompt } = require("inquirer");
require("console.table");
const connection = require("./db/connection");
const logo = require("asciiart-logo");
const inquirer = require("inquirer");

//function to display ascii logo

startEMS();
function startEMS() {
  // connection.connect(err => {if (err) throw err});
  const logoText = logo({ name: "Employee Manager" }).render();

  console.table(logoText);
}

//function to launch user choices

loadMainPrompts();
function loadMainPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userInput",
        message: "What would you like to do?",
        choices: [
          "View All Employees?",
          "View All Departments?",
          "View All Employees by Department?",
          "View All Roles?",
          "View All Employees by Role",
          "View All Managers",
          "View Annual Budget by Department",
          "Update Employee Name, Role and/or Manager?",
          "Add Employee?",
          "Add Role?",
          "Add Department?",
          "Delete Employee",
          "Delete Department",
          "Delete Role",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      switch (res.userInput) {
        case "View All Employees?":
          allEmployees();
          break;

        case "View All Departments?":
          allDepartments();
          break;

        case "View All Employees by Department?":
          employeesByDept();
          break;

        case "View All Roles?":
          employeeRoles();
          break;

        case "View All Employees by Role":
          employeesByRole();
          break;

        case "View All Managers":
          allManagers();
          break;

        case "View Annual Budget by Department":
          depBudget();
          break;

        case "Update Employee Name, Role and/or Manager?":
          updateEmployeeRole();
          break;

        case "Add Employee?":
          addEmployee();
          break;

        case "Add Role?":
          addRole();
          break;

        case "Add Department?":
          addDept();
          break;

        case "Delete Employee":
          deleteEmp();
          break;

        case "Delete Department":
          deleteDept();
          break;

        case "Delete Role":
          deleteRole();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

// function to return all employees
function allEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    (err, res) => {
      if (err) throw err;

      console.table(res);
      loadMainPrompts();
    }
  );
}
//function to return a list of all departments
function allDepartments() {
  connection.query("SELECT * FROM tracker.department", (err, res) => {
    if (err) throw err;

    console.table(res);
    loadMainPrompts();
  });
}

// function to return employees by dept
function employeesByDept() {
  connection.query(
    "select employee.first_name, employee.last_name, department_name AS Department FROM employee JOIN tracker.role ON employee.role_id = tracker.role.id JOIN department ON role.department_id = department.id ORDER BY department_name",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      loadMainPrompts();
    }
  );
}

// function to return all employee roles
function employeeRoles() {
  connection.query(
    "SELECT role.id, role.title, department_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      loadMainPrompts();
      return;
    }
  );
}
//function to display all employees by role
function employeesByRole() {
  connection.query(
    "select title, employee.first_name, employee.last_name, department_name AS Department FROM employee JOIN tracker.role ON employee.role_id = tracker.role.id JOIN department ON role.department_id = department.id ORDER BY title",
    (err, res) => {
      if (err) throw err;
      console.table(res);

      loadMainPrompts();
      return;
    }
  );
}

//function to view all managers
function allManagers() {
  connection.query(
    "SELECT employee.first_name,employee.last_name, manager_id FROM employee WHERE manager_id IS NULL;",
    (err, res) => {
      if (err) throw err;
      console.table(res);

      loadMainPrompts();
      return;
    }
  );
}
//function to view annual payroll budget by department
function depBudget() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message:
          "Which department would you like to see the total utilized budget for?",
      },
    ])
    .then((res) => {
      connection.query(
        `SELECT department_name AS department, SUM(role.salary) AS Total_Budget FROM role LEFT JOIN department on role.department_id = department.id WHERE department_name = '${res.department}';`,
        (err, res) => {
          if (err) throw err;
          console.log("Here is the total annual salary for your department");
          console.table(res);

          loadMainPrompts();
        }
      );
    });
}

// function to update a current employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "lastName",
        message: "What is the employees last name?",
        type: "input",
      },
      {
        name: "firstName",
        message: "What is the employees first name?",
        type: "input",
      },
      {
        name: "id",
        message: "What is the employee ID?",
        type: "input",
      },
      {
        name: "role",
        message: "What is the new Role ID for this employee?",
        type: "input",
      },
      {
        name: "manager_id",
        message: "What is the Manager ID for this employee?",
        type: "input",
      },
    ])
    .then((res) => {
      connection.query(
        "UPDATE employee set ? where ?",
        [
          {
            last_name: res.lastName,
            first_name: res.firstName,
            role_id: res.role,
            manager_id: res.manager_id,
          },
          { id: res.id },
        ],
        (err, res) => {
          if (err) throw err;
          console.log("Employee Role Updated Successfully");
          employeesByRole();
        }
      );
    });
}

// function to add employee to database
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new employees first name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter new employees last name:",
        name: "lastName",
      },
      {
        type: "input",
        message:
          "Enter new employees roleID ('1:Sales Manager, 2:Sales Representative, 3:Development Manager, 4:Development Staff, 5:Human Resources Manager, 6:Human Resources Analyst, 7:Engineering Manager, 8:Engineering Lead, 9:Junior Engineer'):",
        name: "Role",
      },

      {
        type: "input",
        message: "Enter new employees managerID:",
        name: "managerID",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO employee set ?",
        [
          {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.Role,
            manager_id: res.managerID,
          },
        ],
        (err, res) => {
          if (err) throw err;
          console.log("New Employee Added");
          allEmployees();
        }
      );
    });
}

// function to add role to existing department
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the title of new role:",
        name: "title",
      },
      {
        type: "input",
        message: "Enter the salary of new role:",
        name: "salary",
      },
      {
        type: "input",
        message:
          "Enter the department ID of new role:",
        name: "dept_id",
      },
    ])
    .then((res) => {
      connection.query(
        "insert into role set ?",
        [{ title: res.title, salary: res.salary, department_id: res.dept_id }],
        (err, res) => {
          if (err) throw err;
          console.log("New Role added successfully.");
          employeeRoles();
        }
      );
    });
}

// function to add a department to database
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the new department:",
        name: "dept",
      },
    ])
    .then((res) => {
      connection.query(
        "insert into department set ?",
        [{ department_name: res.dept }],
        (err, res) => {
          console.log("New department successfully added.");

          allDepartments();
        }
      );
    });
}

function deleteEmp() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the id of the employee you would like to delete:",
        name: "id",
      },
    ])
    .then((res) => {
      connection.query(
        "delete from employee where ?",
        [{ id: res.id }],
        (err, res) => {
          if (err) throw err;
          console.log(
            "Employee successfully deleted, updated table shown below."
          );
          allEmployees();
        }
      );
    });
}

function deleteDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the department you would like to delete:",
        name: "name",
      },
    ])
    .then((res) => {
      connection.query(
        ("delete from department where ?"),
        [{ department_name: res.name }],
        (err, _res) => {
          if (err) throw err;
          console.log(
            "Department successfully deleted, updated table shown below"
          );

          allDepartments();
        }
      );
    });
}

function deleteRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the role you would like to delete:",
        name: "title",
      },
    ])
    .then((res) => {
      connection.query(
        `DELETE FROM role
                    WHERE title = ${JSON.stringify(res.title)}`);

          console.log (
            "Employee Role successfully deleted, updated table shown below"
          );
          employeeRoles();
        });
};
    ;


function quit() {
  console.log("That's all for now...Goodbye");
  process.exit();
}
