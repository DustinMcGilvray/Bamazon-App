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
//Display Current Inventory after Connection
connection.connect(function (error) {
    if (error) throw error;
    startApp();
});
//App Start Function
function startApp() {
    inquirer.prompt({
            name: "search",
            type: "list",
            message: "Choose a Menu Option to Continue.",
            choices: [
                "View Products for Sale.",
                "View Low Inventory.",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            if (answer.search === "View Products for Sale.") {
                saleProducts();
            } else if (answer.search === "View Low Inventory.") {
                lowInventory();
            } else if (answer.search === "Add to Inventory") {
                lowInventoryShow();
            } else if (answer.search === "Add New Product") {
                newProduct();
            }
        });
}
//End Connection Function
function endConnection() {
    inquirer.prompt({
            name: "end",
            type: "list",
            message: "Are you ready to end the connection?",
            choices: [
                "YES",
                "NO"
            ]
        })
        .then(function (answer) {
            if (answer.end === "YES") {
                connection.end();
            } else if (answer.end === "NO") {
                startApp();
            }
        });
}
// Function for Viewing Products for Sale
function saleProducts() {
    var displayData = "SELECT * FROM products";
    connection.query(displayData, function (error, response) {
        if (error) throw error;
        console.log("\n\n");

        //Formatting Database Table in the Terminal Screen
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price", "Stock Quantity"]);
        t.attrRange({
            row: [0, 1]
        }, {
            align: "center",
            color: "blue",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [0, 3]
        }, {
            color: "green",
            bg: "black"
        });
        t.attrRange({
            column: [0, 1]
        }, {
            align: "center"
        });
        t.attrRange({
            column: [2]
        }, {
            align: "right"
        });

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price, Items.stock_quantity])
        });

        console.log("" + t);
        endConnection();
    });
}
// Function for Viewing Updated Inventory Levels after Adding Stock.
function showInventory() {
    var displayData = "SELECT * FROM products";
    connection.query(displayData, function (error, response) {
        if (error) throw error;
        console.log("\n");
        console.log("Updated Inventory Levels")

        //Formatting Database Table in the Terminal Screen
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price", "Stock Quantity"]);
        t.attrRange({
            row: [0, 1]
        }, {
            align: "center",
            color: "blue",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [0, 3]
        }, {
            color: "green",
            bg: "black"
        });
        t.attrRange({
            column: [0, 1]
        }, {
            align: "center"
        });

        t.attrRange({
            column: [2]
        }, {
            align: "right"
        });

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price, Items.stock_quantity])
        });

        console.log("" + t);
        endConnection();
    });
}
// Function for Viewing Low Inventory
function lowInventory() {
    var displayData = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(displayData, function (error, response) {
        if (error) throw error;
        console.log("\n\n");
        console.log("Low Inventory Levels");
        //Formatting Database Table in the Terminal Screen
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price", "Stock Quantity"]);
        t.attrRange({
            row: [0, 1]
        }, {
            align: "center",
            color: "blue",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [0, 3]
        }, {
            color: "green",
            bg: "black"
        });
        t.attrRange({
            column: [0, 1]
        }, {
            align: "center"
        });
        t.attrRange({
            column: [2]
        }, {
            align: "center"
        });

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price, Items.stock_quantity])
        });

        console.log("" + t);
        addInvendCon();
    });
}
// Function to Show Low Inventory before add Inventory Function but NOT END CONNECTION
function lowInventoryShow() {
    var displayData = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(displayData, function (error, response) {
        if (error) throw error;
        console.log("\n\n");
        console.log("Low Inventory Levels");
        //Formatting Database Table in the Terminal Screen
        var t = new Table({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price", "Stock Quantity"]);
        t.attrRange({
            row: [0, 1]
        }, {
            align: "center",
            color: "blue",
            bg: "black"
        });
        t.attrRange({
            row: [1],
            column: [0, 3]
        }, {
            color: "green",
            bg: "black"
        });
        t.attrRange({
            column: [0, 1]
        }, {
            align: "center"
        });
        t.attrRange({
            column: [2]
        }, {
            align: "center"
        });

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price, Items.stock_quantity])
        });

        console.log("" + t);
        addInventory();
    });
}
//Function for Adding to Inventory Levels
function addInventory() {
    inquirer.prompt([{
                name: "id",
                type: "input",
                message: "Please input the id for the product you wish to update.",
            },
            {
                name: "stock",
                type: "input",
                message: "How much stock would you like to add?"
            }
        ])
        .then(function (answer) {
            var userItem = answer.id;
            var userQty = parseInt(answer.stock);
            var sql = "SELECT * FROM products Where ?";
            // console.log("userQty", userQty);

            connection.query(sql, {
                id: userItem
            }, function (error, response) {
                // console.log(response);
                // console.log(response[0].stock_quantity)
                if (error) throw error;

                if (response[0].stock_quantity + userQty) {
                    console.log("Stock quantity is being updated.");

                    // Update the mySQL Database
                    var updateQty = "UPDATE products SET ? WHERE ?";
                    connection.query(updateQty, [{
                            stock_quantity: response[0].stock_quantity + userQty
                        },
                        {
                            id: userItem
                        }
                    ], function (error, data) {
                        if (error) throw error;
                        console.log("Stock has been updated. You have added " + answer.stock);
                        showInventory();
                    })
                }
            });

        });
}
//Function for Adding a New Product
function newProduct() {
    inquirer.prompt([{
                name: "product",
                type: "input",
                message: "What is the Product Name?",
            },
            {
                name: "department",
                type: "list",
                message: "What Department will the product be located in?",
                choices: [
                    "Apparel",
                    "Toys",
                    "Movies",
                    "Music"
                ]
            },
            {
                name: "price",
                type: "input",
                message: "What is the Sale Price of the new product?",
            },
            {
                name: "stock",
                type: "input",
                message: "What is the stock quantity of the new product?",
            }
        ])
        .then(function (answer) {
            var sql = "INSERT INTO products SET ?";
            connection.query(sql, {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (error, response) {
                    console.log("The new product has been added!");
                    endConnection();
                }
            );
        })
}
//Prompt to add Inventory or End Connection
function addInvendCon() {
    inquirer.prompt({
        name: "decide",
        type: "list",
        message: "Would you like to add stock?",
        choices: [
            "YES",
            "NO"
        ]
    })
    .then(function(answer){
        if (answer.decide === "YES") {
            addInventory();
        } else if (answer.decide === "NO") {
            doWhat();
        }
    })

}
//Prompt Asking what user would like to do next
function doWhat() {
    inquirer.prompt({
        name:"decision",
        type: "list",
        message: "What would you like to do next?",
        choices: [
            "Return to Main Menu?",
            "End Connection?"
        ]
    })
    .then(function(answer){
        if(answer.decision === "Return to Main Menu?") {
            startApp();
        }
        else if(answer.decision === "End Connection?") {
            endConnection();
        }
    })
}