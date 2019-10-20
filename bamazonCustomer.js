var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "",
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // display inventory and prompt user to make a purchase
  console.log("\nConnection Established\n");
  displayInventory();
});

// Displays Current Inventory
function displayInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log("================================================== Bamazon Inventory ==================================================\n");
		console.log("=======================================================================================================================\n");

		var inventory = '';
		for (var i = 0; i < res.length; i++) {
			inventory = '';
			inventory += "Item ID: " + res[i].item_id + " | ";
			inventory += "Product Name: " + res[i].product_name + " | ";
			inventory += "Department: " + res[i].department_name + " | ";
			inventory += "Price: $" + res[i].price + "\n";
			console.log(inventory);
		}
		console.log("=======================================================================================================================\n");
        userPrompt();
	}) 
};

// Prompt user to select item to purchase and how many units
function userPrompt() {
	inquirer.prompt([{
		name: "productID",
		type: "input",
		message: "Enter ID Number of product you would like to purchase.",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}, {
		name: "productUnits",
		type: "input",
		message: "How many units of this product would you like to purchase?",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false
		}
    }])
};