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

var options = ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"];

// console.log("Welcom To Bamazon - The Most Explosive Place For Everything!");
console.log("____________________________________________________________");


function start(){
    inquirer.prompt([
            {
              name: 'pickAction',
              message: 'Welcome To The Bamazon Management Portal!\nPlease Select One Of The Following Options: ',
              type: 'list',
              choices: options
            }
          ]).then(function(answers) {

            // Run Switch Case To Trigger A Function
            switch (answers.pickAction) {
                case "View Products for Sale":
                    // console.log("View Products for Sale");
                    productSales();
                    break;
                case "View Low Inventory":
                    // console.log("View Low Inventory");
                    lowInventory();
                    break;
                case "Add to Inventory":
                    // console.log("Add to Inventory");
                    addInventory();
                    break;
                case "Add New Product":
                    // console.log("Add New Product");
                    addProduct();
                    break;
            }
        });
      };

function productSales(){
    connection.query("SELECT id, product_name, price, stock_quantity FROM ??",["products"], function(err, res) {
        if (err) throw err;
        for(var i = 0; i < res.length; i++){
            console.log("Item Number: " + res[i].id + " | " + res[i].product_name + " | Price: $" + res[i].price + " | Units Available: " + res[i].stock_quantity);
        }
        console.log("____________________________________________________________");
        start();
    });
}

function lowInventory(){
    connection.query("SELECT product_name, stock_quantity FROM ??",["products"], function(err, res) {
        if (err) throw err;
        var lowStockCount = 0;
        
        console.log("____________________________________________________________");
        // Loop Through SQL Looking For Low Stock - 5 or Less Units
        for(var i = 0; i < res.length; i++){
            var inventoryLevel = res[i].stock_quantity;
            if(inventoryLevel < 6){
                console.log("Low Inventory: " + res[i].product_name + " | Units Remaining: " + res[i].stock_quantity);
                lowStockCount++;
            };
        }
        
        // Use Counter To Trigger If All Levels Are Ok (i.e. Counter is 0)
        if(lowStockCount === 0){
            console.log("Fully Stocked: Inventory Levels OK!");
            console.log("____________________________________________________________\n\n");
            start();
        }else{
            console.log("____________________________________________________________\n\n");
            start();
        }; 
    });
 };


function addInventory(){
    console.log("\n\nAdd New Items To Inventoy");
    var storeItems = [];
    var stockArray = [];


    connection.query("SELECT product_name, stock_quantity FROM ??",["products"], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            storeItems.push(res[i].product_name);
            stockArray.push(res[i].stock_quantity);
        }
    
    inquirer.prompt([
        {
            name: 'itemName',
            message: 'Select The Item Being Restocked',
            type: 'list',
            choices: storeItems
        },
        {
            name: 'quantity',
            message: 'How Many Are Being Added To Inventory?',
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

        var newUnits = answers.quantity;
        var updateItem = answers.itemName;
        // Looks Up Possition In Store Item Array
        var keySpot = storeItems.indexOf(updateItem);
        // Looks Up Quanity Using Position In Name Array
        var currentUnits = stockArray[keySpot];
        // Calculate New Inventory Based on Existing And New
        var updatedInventory = parseInt(newUnits) + parseInt(currentUnits);

        var query = connection.query(
              "UPDATE products SET stock_quantity = '" + updatedInventory +"' WHERE product_name = '"+updateItem+"'", function(err, res) {
              console.log(newUnits + " " + updateItem + "(s) Added!\n");
              console.log("____________________________________________________________\n\n");
              start();
              }
          );
      });
    });
};


function addProduct(){



};



start();
  