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
  database: process.env.SQL_DB
});


console.log("\n\n\nWelcom To Bamazon - The Most Explosive Place For Everything!");
console.log("____________________________________________________________");
console.log("\nCurrent Inventory:\n");

// Display Inventory By Looping Through SQL Array
connection.query("SELECT * FROM ??",["products"], function(err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++){
      console.log("Item Number: " + res[i].id + " | " + res[i].product_name + " | Price: $" + res[i].price + " | Units Available: " + res[i].stock_quantity);
    }
    console.log("____________________________________________________________\n\n");
    start();
});

// Start Store
function start(){
    inquirer.prompt([
        {
            name: 'buyItem',
            message: '\nWould You Like To Buy An Item?\nPlease Enter The Item Number:  ',
            type: 'input',
            validate: function(value){
                if(value !=="" && typeof parseInt(value) === "number") {
                    return true;
                } else{
                    console.log('\nPlease Enter A Valid Item Number!');
                    return false;
                }
            }
        },
        {
            name: 'buyQuantity',
            message: 'Please Enter Quantity:  ',
            type: 'input',
            validate: function(value){
                if(value !=="" && typeof parseInt(value) === "number") {
                return true;
                } else{
                console.log('Please Enter A Valid Number!');
                return false;
                }
            }
        }
        ]).then(function(answers) {
        // Store Answers As Variables
            var buyItem = answers.buyItem;
            var buyQuantity = answers.buyQuantity;

        // Query The Item Number From SQL
            connection.query("SELECT ??, ??, ?? FROM ?? WHERE id ="+buyItem,["stock_quantity", "product_name", "price","products"], function(err, res) {
                if (err) throw err;
                 var buyInventory = res[0].stock_quantity;
                 var buyName = res[0].product_name;
                 var buyUnitPrice = res[0].price;
                 console.log("____________________________________________________________");
                 console.log("\nEach " + buyName +" Costs: $" + buyUnitPrice);
                 var orderTotal = parseFloat(buyUnitPrice) * parseInt(buyQuantity);
                 console.log("The Store Has " + buyInventory + " In Current Inventory");
                 console.log("____________________________________________________________");
            
                // Check Current Inventory To See If We Can Process The Order
                if(buyInventory < buyQuantity){
                    console.log("\nWe Cannote Complete Your Order\nThe Store Does Not Have Enough Inventory!\n")
                    console.log("____________________________________________________________\n\n");
                    start();
                } else{
                    console.log("\nYou Order Has Been Procesed!");
                    var newInventory = parseInt(buyInventory) - parseInt(buyQuantity);
                    console.log("You Purchased " + buyQuantity + " " + buyName +"(s)");
                    console.log("Bamazon Has " + newInventory + " " + buyName +"(s) Left In Inventory");
                    connection.query("UPDATE ?? SET ?? ='" + newInventory + "'WHERE id =" + buyItem,["products", "stock_quantity"],function(err, res) {
                        if (err) throw err;
                        console.log("Your Total Purchase Amount: $" + orderTotal);
                        console.log("____________________________________________________________\n\n");
                        start();
                    });
                };
            });
        });
    };

