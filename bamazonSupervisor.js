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
                "View Product Sales.",
                "Create New Department"
            ]
        })
        .then(function (answer) {
            if (answer.search === "View Product Sales.") {
                viewProductSales();
            } else if (answer.search === "Create New Department") {
                createDepartment();
            }
        });
}

function viewProductSales() {
    var displayData = "SELECT * FROM departments";
    // var displayData = "SELECT departments. *, SUM(products.product_sales) AS total_sales FROM departments LEFT JOIN products ON departments.department_name GROUP BY products.department_name";
    connection.query(displayData,
        function (error, response) {
        if (error) throw error;
        console.log("\n");

        //Formatting Database Table in the Terminal Screen
        var t = new Table ({
            borderStyle: 3,
            horizontalLine: true,
            width: [5, 60, 15]
        });

        t.push(["ID", "Department", "Overhead Cost","Total Sales", "Total Profit"]);
        t.attrRange({row: [0, 1]}, {
            align: "center",
            color: "blue",
            bg: "black"
          });
          t.attrRange({row: [1], column: [0,4]}, {
            color: "green",
            bg: "black"
          });
          t.attrRange({column: [0,1]},
        {align: "center"});
        t.attrRange({column: [2]},
            {align: "right"});

        response.forEach(function (Items) {
            t.push([Items.ID, Items.department_name, "$" + Items.overhead_costs, "$" + Items.product_sales, "$" + Items.product_sales - Items.overhead_costs])
        });

        console.log("" + t);
        
    });
}

function createDepartment() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Please input the new department name.",
    },
    {
        name: "cost",
        type: "input",
        message: "Please input a projected overhead cost."
    },
    {
        name: "sales",
        type: "input",
        message: "Please set product_sales to 0."
    }
])
.then(function (answer) {
    var sql = "INSERT INTO departments SET ?";
    connection.query(sql, {
            department_name: answer.name,
            overhead_costs: answer.cost,
            product_sales: answer.sales,
        },
        function (error, response) {
            if (error) throw error;
            console.log("The new department has been added!");           
        }
    );
})
}