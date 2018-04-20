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


console.log("\n\n\nWelcom To Bamazon - The Most Explosive Place For Everything!");
console.log("____________________________________________________________");
console.log("\n                Current Inventory:\n");

// Display Inventory By Looping Through SQL Array
connection.query("SELECT * FROM ??",["products"], function(err, res) {
    if (err) throw err;
    // for(var i = 0; i < res.length; i++){
    //   console.log("Item Number: " + res[i].id + " | " + res[i].product_name + " | Price: $" + res[i].price + " | Units Available: " + res[i].stock_quantity);
    // }
    console.table(res);
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
            connection.query("SELECT ??, ??, ??, ??, ?? FROM ?? WHERE id ="+buyItem,["stock_quantity", "product_name", "price", "department_name", "product_sales", "products"], function(err, res) {
                if (err) throw err;
                 var buyInventory = res[0].stock_quantity;
                 var buyName = res[0].product_name;
                 var buyUnitPrice = res[0].price;
                 var buyDepartment = res[0].department_name;
                 var buyProductSales = res[0].product_sales;
                 
                // Check Current Inventory To See If We Can Process The Order
                if(buyInventory < buyQuantity){
   
                    console.log("\n\n***We Cannote Complete Your Order***\nThe Store Does Not Have Enough Inventory!")
                    console.log("____________________________________________________________\n\n");
                    start();
                } else{
                    var orderTotal = parseFloat(buyUnitPrice) * parseInt(buyQuantity);
                    var newInventory = parseInt(buyInventory) - parseInt(buyQuantity);
                    var newProductSales = parseFloat(buyProductSales) + parseFloat(orderTotal);

                    console.log("\n\nOrder Procesed!");
                    console.log("____________________________________________________________\n");
                    console.log("Each " + buyName +" Costs: $" + buyUnitPrice);
                    console.log("You Purchased " + buyQuantity + " " + buyName +"(s)");
                    console.log("Bamazon Has " + newInventory + " " + buyName +"(s) Left In Inventory");
                    console.log("Your Total Purchase Amount Was: $" + orderTotal);
                    console.log("\n____________________________________________________________");

                    // Update Product Stock
                    connection.query("UPDATE ?? SET ?? = ? WHERE id = ?",["products", "stock_quantity", newInventory, buyItem],function(err, res) {
                        if (err) throw err;
                        
                        // Update Product Sales
                        connection.query("UPDATE ?? SET ?? = ? WHERE id = ?",["products", "product_sales", newProductSales, buyItem],function(err, res) {
                            if (err) throw err;

                            // Updates Department Sales
                            connection.query("SELECT ?? FROM ?? WHERE department_name = ?",["product_sales","departments", buyDepartment], function(err, res) {

                                // Calculate New Sales Based On Existing Sales + Purchase
                                var newTotalSales = parseFloat(orderTotal) + parseFloat(res[0].product_sales);
        
                                // Update Department Table
                                connection.query("UPDATE ?? SET ?? = '" + newTotalSales +"' WHERE ?? = '"+buyDepartment+"'",["departments", "product_sales", "department_name"],function(err, res) {
                                
                                start();

                                });
                            });
                        });
                    });
                };
            });
        });
    };
