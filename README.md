# Bamazon-App

### DESCRIPTION
Bamazon is a Command-Line Interface (CLI) application that consists of three user levels: Customer, Management, and Supervisor.

#### Customer Level

As a Customer at Bamazon, the application will begin by displaying items for sale by Department or All items. The items can then be 'purchased' from the Bamazon store. Once an item has been chosen, the application will check available stock against the desired purchase quantity. If the stock is available, the purchase will be processed, the inventory will be reduced by the quantity purchsed, and the sale will be added to the product sales. If the stock is not available to fill the order, the Customer will be given a prompt to choose another item or reduce desired quantity. 

![Screenshot](screencaptures/commandLineBegin.JPG)

#### Manager Level
As a Manager for Bamazon, the application will begin by displaying a list of options: 

* View Products for Sale - will list every available item for sale and available information: the item IDs, names, prices, and quantities.
* View Low Inventory - will list all items with an inventory count lower than five.
* Add to Inventory - will display a prompt that will allow stock to be replenished. 
* Add New Product - will allow a completely new product to be added to the store.

The inventory database will be updated with any new stock or products added by the Manager.

#### Supervisor Level
As a Supervisor at Bamazon, the application will begin by displaying a list of options:

* View Product Sales by Department - displays a summarized table with department_id, department_name, over_head_costs, product_sales, and total_profit.
* Create New Department - will allow entirely new Departments to be created for Bamazon. 
