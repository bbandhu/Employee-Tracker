const inquirer = require("inquirer");
const fs = require("fs");
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user:process.env.username,
    // TODO: Add MySQL password here
    password: process.env.password,
    database: process.env.database
  },
  console.log(`Connected to the employees_db database.`)
);

const questions=[
  //list of questions
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "Add Role",
      "Remove Role",
      "View All Departments",
      "Add Department",
      "Remove Department",
      "Exit",
    ],
  },
]
const deptQuestions = [
    {
        name: "dept",
        message: "What would you like to do?",
        type: "input",
      },
    
      {
        name: "department_name",
        message: "what is the name of the department?",
        type: "input",
        message:"Added service to the database"
      },
      {
        name: "role",
        message: "what would you like to do?",
        type: "input",
        
      },
      {
        name: "role_name",
        message: "what is the name of the role?",
        type: "input",
      },
      {
        name: "role_salary",
        message: "what is the salary of the role?",
        type: "input",
      },
      {
        name: "roleBelongsTo",
        message: "which department does the role belong to?",
        type: "input",
      },
    ]
    const emplyeeQuestions=[
    {
        name: "dept",
        message: "What would you like to do?",
        type: "input",
    },

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

    const updateEmployee=[
        {
            name: "employee_update",
            message: "What would you like to do?",
            type: "input",
        },
        {
            name: "employee",
            message: "which employee would you like to update?",
            type: "input",
        }
    ]
    