var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("\nConnection Established\n");
  displayInventory();
});

function displayInventory() {
	queryStr = "SELECT * FROM products";
	connection.query(queryStr,function(err,data) {
		if (err) throw err;
		console.log("================================================== Bamazon Inventory ==================================================\n");
		console.log("=======================================================================================================================\n");

		var inventory = '';
		for (var i = 0; i < data.length; i++) {
			inventory = '';
			inventory += "Item ID: " + data[i].item_id + " | ";
			inventory += "Product Name: " + data[i].product_name + " | ";
			inventory += "Department: " + data[i].department_name + " | ";
			inventory += "Price: $" + data[i].price + "\n";
			console.log(inventory);
		}
		console.log("=======================================================================================================================\n");

	}) 
};