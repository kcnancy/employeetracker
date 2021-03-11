const connection = require("./connection");
module.exports = {

    findAllEmployees: ()=> {
    let query =
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    LEFT JOIN role ON (employee.role_id = role.id)
    LEFT JOIN department ON (role.department_id = department.id)
    ORDER BY employee.id`;
   
    connection.query (query,(err, res)=>{
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        //prompt();

    })
    }

    }