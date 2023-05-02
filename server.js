const inquirer = require("inquirer");
const fs = require("fs");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    port:'3306',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Password2022',
    database: 'employees_db',

    // host:process.env.host,
    // port:3306,
    // user:process.env.user,
    // // TODO: Add MySQL password here
    // password:process.env.password,
    // database:process.env.database,
  },
  console.log(`Connected to the employees_db database.`)
);

const questions = [
  //I am presented with the following options: 
  //view all departments,
  //  view all roles, view all employees,
  //   add a department, add a role,
  //    add an employee, and
  //     update an employee role
  //list of questions
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Employees",
      "View All Roles",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "Exit",
    ],
  },
];
const deptQuestions = [
  // {
  //   name: "dept",
  //   message: "What would you like to do?",
  //   type: "input",
  // },

  {
    name: "department_name",
    message: "what is the name of the department?",
    type: "input",
  },
  
];
const employeeQuestions = [
 
  {
    name: "employee_firstname",
    message: "what's the employee firstname?",
    type: "input",
  },

  {
    name: "employee_lastname",
    message: "what's the employee lastname?",
    type: "input",
  },
  {
    name: "employee_role",
    message: "what's the employee role?",
    type: "input",
  },
  {
    name: "employee_manager",
    message: "who is the employee manager?",
    type: "input",
  },
];


const roleQuestions = [

  {
    name: "title",
    message: "what is the tile of the role?",
    type: "input",
  },
 {
  name: "salary",
  message: "what is the salary of the role?",
  type: "input",
 },

 {
    name: "department_id",
    message: "what is the id of the department?",
    type: "input",
  },


  
];
const updateEmployee = [
  {
    name: "employee_id",
    message: "Which employee would you like to update?",
    type: "input",
  },
  {
    name: "new_role_id",
    message: "What is the new role ID for the employee?",
    type: "input",
  },
  {
    name: "department_name",
    message: "What is the name of the department the employee is in?",
    type: "input",
  },
];
//prompt user with questions array and return answers
function start() {
  inquirer.prompt(questions).then((data) => {
    console.log(data);
    switch (data.choice) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "View All Employees By Department":
        viewAllEmployeesByDepartment();
        break;

      case "View All Employees By Manager":
        viewAllEmployeesByManager();
        break;

      case "Add an Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      case "Update an Employee Role":
        updateEmployeeRole();
        break;

      case "View All Roles":
        viewAllRoles();
        break;

      case "Add a Role":
        addRole();
        break;

      case "Remove Role":
        removeRole();
        break;

      case "View All Departments":
        viewAllDepartments();
        break;

      case "Add a Department":
        addDepartment();
        break;

      case "Remove Department":
        removeDepartment();
        break;

      default:
        console.log(`Invalid choice: ${data.choice}`);
        start();
    }
  }).catch((error) => {
    console.error('Error:', error);
  });
}

start(); // call the start function to initiate the prompt

//if the user chooses add department, prompt user with deptQuestions array and return answers.

function addDepartment() {
  inquirer.prompt(deptQuestions).then((data) => {
    console.log(data);
    db.query(
      `INSERT INTO department (name) VALUES ('${data.department_name}');`,
      (err, res) => {
        if (err) throw err;
        console.log(res);
        viewAllDepartments();
      }
    );
  });
}

//view all departments
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//view all roles
function viewAllRoles() {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//view all employees
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//view all employees by department
function viewAllEmployeesByDepartment() {
  db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name as department_name
  FROM employee e
  INNER JOIN role r ON e.role_id = r.id
  INNER JOIN department d ON r.department_id = d.id
  ORDER BY d.name, e.last_name;`, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//view all employees by manager
function viewAllEmployeesByManager() {
  db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department_name, e.manager_id
  FROM employee e
  LEFT JOIN role r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  ORDER BY e.manager_id;`, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}


//add an employee 
function addEmployee() {
  inquirer.prompt(employeeQuestions).then((data) => {
    console.log(data);
    db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.employee_firstname}', '${data.employee_lastname}', '${data.employee_role}', '${data.employee_manager}');`,
      (err, res) => {
        if (err) throw err;
        console.log(res);
        viewAllEmployees();
      }
    );
  });
}


//add a role and promp to enter the name, salary, and department for the role and that role is added to the database

function addRole(){
  inquirer.prompt(roleQuestions).then((data) => {
    console.log(data);
    db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', '${data.department_id}');`,
      (err, res) => {
        if (err) throw err;
        console.log(res);
        viewAllRoles();
      }
    );
  });
}

function updateEmployeeRole() {
  inquirer.prompt(updateEmployee).then((data) => {
    console.log(data);
    db.query(
      `UPDATE employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      SET e.role_id = ${data.new_role_id}
      WHERE e.id = ${data.employee_id} AND d.name = '${data.department_name}';`,
      (err, res) => {
        if (err) throw err;
        console.log(res);
        viewAllEmployees();
      }
    );
  });
}
