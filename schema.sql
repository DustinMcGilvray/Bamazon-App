DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
ID INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR (50) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER (11) NOT NULL,
product_sales DECIMAL (10,2) NOT NULL,
PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Slap Bracelet", "Apparel", 1.00, 12, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Leg Warmers", "Apparel", 4.75, 6, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sweatband", "Apparel", 3.50, 8, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Miami Vice Jacket", "Apparel", 125.00, 4, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Tube Socks", "Apparel", 2.00, 5, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Rubiks Cube", "Toys", 5.50, 9, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Simon Game", "Toys", 9.99, 7, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Slinky", "Toys", 4.99, 3, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Lite Brite","Toys", 12.50, 4, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Top Gun - VHS", "Movies", 8.99, 10, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("The Burbs - VHS", "Movies", 6.00, 8, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Princess Bride - VHS", "Movies", 4.99, 5, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("The Money Pit - VHS", "Movies", 5.50, 4, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("New Kids on the Block - Cassette", "Music", 4.50, 7, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Vanilla Ice - Cassette", "Music", 5.00, 4, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Michael Jackson - Cassette", "Music", 6.00, 6, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Milli Vanilli - Cassette", "Music", .50, 2, 0);
		
CREATE TABLE departments(
ID INTEGER NOT NULL AUTO_INCREMENT,
department_name VARCHAR (50) NOT NULL,
overhead_costs DECIMAL (10, 2) NOT NULL,
PRIMARY KEY (ID)
);

ALTER TABLE departments
ADD product_sales DECIMAL (10, 2) NOT NULL;

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Apparel", 1000.00);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Toys", 500.00);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Movies", 1000.00);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Music", 250.00);

SELECT departments. *, SUM(products.product_sales) AS total_sales FROM departments LEFT JOIN products ON departments.department_name GROUP BY products.department_name;