require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.SQL_KEY,
  database: "great_bay"
});


var choices = ["Bid On An Item", "Post An Item"];


// Upon loading up the program, the user is prompted on whether they would like to "POST AN ITEM" or "BID ON AN ITEM"


function start(){
  inquirer.prompt([
          {
            name: 'pickAction',
            message: 'Would You Like To Bid or Post?',
            type: 'list',
            choices: choices
          }
        ]).then(function(answers) {
          if (answers.pickAction === 'Bid On An Item') {
            bid();
          } else {
            post();  
          }
      });
    };

function post(){
  inquirer.prompt([
    {
      name: 'postItem',
      message: 'Enter Item Name: ',
      type: 'input'
    },
    {
      name: 'category',
      message: 'Enter Category: ',
      type: 'input'
    }
  ]).then(function(answers) {
    console.log("post working");
    var query = connection.query(
          "INSERT INTO ?? SET ?",
          ["auction",
          {
          item: answers.postItem,
          category: answers.category
          }],
      function(err, res) {
          console.log(res.affectedRows + " Items Added!\n");
          }
      );
  });
};


function bid() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM ??",["auction"], function(err, res) {
    if (err) throw err;
    
    // Log all results
    for(var i = 0; i < res.length; i++){
      console.log("Item Number: " + res[i].id + " | Item: " + res[i].item + " | High Bid Is: " + res[i].high_bid);
    }

    inquirer.prompt([{
        name: 'selectItem',
        message: 'Enter The Item Number You Want To Bid On: ',
        type: 'input',

        validate: function(value){
          if(value > 0 && typeof parseInt(value) === "number") {
            return true;
          } else{
            console.log('Please Enter A Valid Item Number!');
            return false;
          }
        }
      }
    ]).then(function(answer) {
      console.log(answer);
      var pick = parseInt(answer.selectItem) -1;
      console.log("You Picked: " + res[pick].item);
 
    });
  });
};
  









start();
