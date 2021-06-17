const inquirer = require("inquirer");
const connection = require("./assets/connection");



function start(){
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",
                "Update Employee Manager",
                "View Employee By Manager",
                "Delete Employee",
                "Delete Role",
                "Delete Department",
                "Exit"
            ]

        }).then(answer => {

            switch (answer.choice) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "View Employee By Manager":
                    viewEmployeeByManager();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "Delete Role":
                    deleteRole()
                    break;
                case "Delete Department":
                    deleteDepartment()
                    break;
                case "Exit":
                    connection.end();
                    console.log("Have a good day");
                    break;
            }
        })
}

function viewAllEmployees(){
    const sql = 
    "SELECT emp.id AS EmployeeID, concat(emp.first_name, ' ', emp.last_name) as EmployeeName, role.title, role.salary, department.name, concat(manager.first_name, ' ', manager.last_name) AS ManagerName FROM employee AS emp " + 
    "LEFT JOIN employee_db.employee AS manager ON emp.manager_id=manager.id " +
    "LEFT JOIN role ON emp.role_id=role.id " +
    "LEFT JOIN department ON department.id=role.department_id ";

    connection.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
    })
}

connection.connect((err) => {
    if (err) throw err;
    start();
});