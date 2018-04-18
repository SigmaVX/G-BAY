require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.SQL_KEY,
  database: process.env.SQL_DB
});

var options = ["View Department Sales","Create New Department"];

console.log("____________________________________________________________");

function start(){
    inquirer.prompt([
            {
              name: 'pickAction',
              message: '\nWelcome To The Bamazon Supervisor Portal!\nPlease Select One Of The Following Options: ',
              type: 'list',
              choices: options
            }
          ]).then(function(answers) {

            // Run Switch Case To Trigger A Function
            switch (answers.pickAction) {
                case "View Department Sales":
                    departmentSales();
                    break;
                case "Create New Department":
                    crrateDepartment();
                    break;
            }
        });
      };

function crrateDepartment(){

    inquirer.prompt([
        {
            name: 'departmentName',
            message: 'Enter New Department Name: ',
            type: 'input',
            validate: function(value){
                if(value !=="" && typeof value === "string") {
                return true;
                } else{
                console.log(' **Please Enter A Valid Name!** ');
                return false;
                }
            }
        },
        {
            name: 'overhead',
            message: 'Enter Initial Overhead Cost: ',
            type: 'input',
            validate: function(value){
                if(value !=="" && typeof parseInt(value) === "number") {
                return true;
                } else{
                console.log(' **Please Enter A Valid Number!** ');
                return false;
                }
            }
        }
    ]).then(function(answers) {
        connection.query(
            "INSERT INTO ?? SET ?",
            ["departments",
            {
            department_name: answers.departmentName,
            overhead_cost: answers.overhead
            }],
        function(err, res) {
            console.log(answers.departmentName + " Was Added To Store!\n");
            console.log("____________________________________________________________\n\n");
            start();
            }
        );
    });
};


function departmentSales(){

    console.log("\n\n\nCurrent Department Sales and Profit");
    console.log("____________________________________________________________\n\n");

    connection.query("SELECT * FROM ??",['departments'], function(err, res) {
        if (err) throw err;
        // Run console table NPM to wrap all the data
        console.table(res);
        console.log("____________________________________________________________\n\n");
        start();
    });
};

start();
