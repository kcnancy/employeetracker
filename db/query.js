const connection = require("./connection");
module.exports = {

    findAllEmployees: ()=> {
    let query =
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name AS department, CONCAT(manager.first_name, manager.last_name) AS manager'
    query =+ "FROM employee"
    query =+ "ON employee.role_id = role.role_id;"
    query += "LEFT JOIN department ON department.id = role.department_id"
    query += "LEFT JOIN employee manager ON (manager.id = employee.manager_id)"
    query =+ "ORDER BY employee.id;"
    connection.query (query,(err, res)=>{
        if (err) throw err
        console.table(res);

    })
    }

    }