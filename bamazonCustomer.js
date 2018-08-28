//Requiring npm's
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("terminal-table");

//Setting up the mySQL Connection to Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password",
    database: "bamazon_db"
});

//Prompt User Function
function userPrompt() {
    inquirer.prompt([
        {
            name: "item_id",
            type:"input",
            message: "Enter the Item ID number of the product you wish to purchase."
        },
        {
            name:"stock_quantity",
            type: "input",
            message: "How many would you like?"
        }
    ])
    .then(function(answer) {
        var checkData = "SELECT * FROM products Where ?"
        connection.query(checkData, {answer:item_id}, function(error, response) {
            if (error) throw error;
        }
);
});

//Display mqSQL Database in Terminal Window
function currentInventory() {
    var displayData = "SELECT * FROM products";
    connection.query(displayData, function (error, response) {
            if (error) throw error;
            console.log("\n\n");

            //Formatting Database Table in the Terminal Screen
            var t = new Table({
                borderStyle: 3,
                horizontalLine: true,
                width: [5, "40%", "10%", 10, 5]
            }, {attrs: "center"});
           
            t.push(["ID", "Product", "Price"]);

            response.forEach(function (Items) {
                t.push([Items.id, Items.product_name, Items.department_name, "$"+Items.price, Items.stock_quantity])
            });

            console.log(" " + t);

            userPrompt();
        }
    )};

    // currentInventory();