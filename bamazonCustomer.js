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
        message: "What type of items are you shopping for?",
        choices: [
            "Apparel",
            "Toys",
            "Movies",
            "Music",
            "Not Sure"
        ]
    })
    .then(function (answer) {
        if (answer.search === "Apparel") {
            apparelItems();
        } else if (answer.search === "Toys") {
            toyItems();
        } else if (answer.search === "Movies") {
            movieItems();
        } else if (answer.search === "Music") {
            musicItems();
        } else if (answer.search === "Not Sure") { 
            allItems();
        }
    });
}
//Prompt User Function
function userPrompt() {
    inquirer.prompt([{
                name: "id",
                type: "input",
                message: "Enter the Item ID number of the product you wish to purchase."
            },
            {
                name: "stock",
                type: "input",
                message: "How many would you like?"
            }
        ])
        .then(function (answer) {
            var userItem = answer.id;
            var userQty = answer.stock;
            var sql = "SELECT * FROM products Where ?";
            connection.query(sql, {
                id: userItem
            }, function (error, response) {
                if (error) throw error;
            
                if (response[0].stock_quantity < userQty) {
                    console.log("Item Quantity is not Available. Please modify quantity.");
                    userPrompt();
                } else if (response[0].stock_quantity >= userQty) {
                    console.log("We are processing your order.");

                    // Update the mySQL Database
                    var updateQty = "UPDATE products SET ? WHERE ?";
                    connection.query(updateQty, [
                        {
                            stock_quantity:response[0].stock_quantity-userQty
                        },
                        {
                            id:userItem
                        }
                    ] ,function (error, data) {
                        if (error) throw error;
                        // console.log(data);
                        console.log("Your order has been processed. Your total is $" + response[0].price * userQty);
                    })
                    connection.end();
                }
            });
        });
        
}
//Display All Items in mqSQL Database in Terminal Window
function allItems() {
    var displayData = "SELECT * FROM products";
    connection.query(displayData, function (error, response) {
        if (error) throw error;
        console.log("\n\n");

        //Formatting Database Table in the Terminal Screen
        var t = new Table ({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price"]);
        t.attrRange({row: [0, 1]}, {
            align: "center",
            color: "blue",
            bg: "black"
          });
          t.attrRange({row: [1], column: [0,3]}, {
            color: "green",
            bg: "black"
          });
          t.attrRange({column: [0,1]},
        {align: "center"});
        t.attrRange({column: [2]},
            {align: "right"});

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price])
        });

        console.log("" + t);
        userPrompt();
    });
}
//Display Apparel Items in mqSQL Database in Terminal Window
function apparelItems() {
    var displayData = "SELECT id, product_name, price FROM products WHERE department_name= 'Apparel'";
    connection.query(displayData,
        function (error, response) {
           for (var i = 0; i < response.length; i++) {
           }
        if (error) throw error;
        console.log("\n");

        //Formatting Database Table in the Terminal Screen
        var t = new Table ({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price"]);
        t.attrRange({row: [0, 1]}, {
            align: "center",
            color: "blue",
            bg: "black"
          });
          t.attrRange({row: [1], column: [0,3]}, {
            color: "green",
            bg: "black"
          });
          t.attrRange({column: [0,1]},
        {align: "center"});
        t.attrRange({column: [2]},
            {align: "right"});

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price])
        });

        console.log(" " + t);
        userPrompt();
    });
}
//Display Toy Items in mqSQL Database in Terminal Window
function toyItems() {
    var displayData = "SELECT id, product_name, price FROM products WHERE department_name= 'Toys'";
    connection.query(displayData,
        function (error, response) {
           for (var i = 0; i < response.length; i++) {
           }
        if (error) throw error;
        console.log("\n");

        //Formatting Database Table in the Terminal Screen
        var t = new Table ({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price"]);
        t.attrRange({row: [0, 1]}, {
            align: "center",
            color: "blue",
            bg: "black"
          });
          t.attrRange({row: [1], column: [0,3]}, {
            color: "green",
            bg: "black"
          });
          t.attrRange({column: [0,1]},
        {align: "center"});
        t.attrRange({column: [2]},
            {align: "right"});

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price])
        });

        console.log(" " + t);
        userPrompt();
    });
}
//Display Movie Items in mqSQL Database in Terminal Window
function movieItems() {
    var displayData = "SELECT id, product_name, price FROM products WHERE department_name= 'Movies'";
    connection.query(displayData,
        function (error, response) {
           for (var i = 0; i < response.length; i++) {
           }
        if (error) throw error;
        console.log("\n");

        //Formatting Database Table in the Terminal Screen
        var t = new Table ({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price"]);
        t.attrRange({row: [0, 1]}, {
            align: "center",
            color: "blue",
            bg: "black"
          });
          t.attrRange({row: [1], column: [0,3]}, {
            color: "green",
            bg: "black"
          });
          t.attrRange({column: [0,1]},
        {align: "center"});
        t.attrRange({column: [2]},
            {align: "right"});

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price])
        });

        console.log(" " + t);
        userPrompt();
    });
}
//Display Music Items in mqSQL Database in Terminal Window
function musicItems() {
    var displayData = "SELECT id, product_name, price FROM products WHERE department_name= 'Music'";
    connection.query(displayData,
        function (error, response) {
           for (var i = 0; i < response.length; i++) {
           }
        if (error) throw error;
        console.log("\n");

        //Formatting Database Table in the Terminal Screen
        var t = new Table ({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Product", "Price"]);
        t.attrRange({row: [0, 1]}, {
            align: "center",
            color: "blue",
            bg: "black"
          });
          t.attrRange({row: [1], column: [0,3]}, {
            color: "green",
            bg: "black"
          });
          t.attrRange({column: [0,1]},
        {align: "center"});
        t.attrRange({column: [2]},
            {align: "right"});

        response.forEach(function (Items) {
            t.push([Items.id, Items.product_name, "$" + Items.price])
        });

        console.log(" " + t);
        userPrompt();
    });
}
