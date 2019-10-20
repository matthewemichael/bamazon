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
  // console.log("\nConnection Established\n");
  displayInventory();
});

// Displays Current Inventory
function displayInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log("\n================================================== Bamazon Inventory ==================================================\n");
		console.log("=======================================================================================================================\n");

		var inventory = '';
		for (var i = 0; i < res.length; i++) {
			inventory = '';
			inventory += "Item ID: " + res[i].item_id + " | ";
			inventory += "Product Name: " + res[i].product_name + " | ";
			inventory += "Department: " + res[i].department_name + " | ";
			inventory += "Price: $" + res[i].price.toFixed(2) + "\n";
			console.log(inventory);
		}
		console.log("=======================================================================================================================\n");
        userPrompt();
	}) 
};

// Prompt user to select item to purchase and how many units
function userPrompt() {
	inquirer.prompt([
    {
		name: "productID",
		type: "input",
		message: "Enter the Item ID of the product you would like to purchase.",
		validate: function(value) {
			if (isNaN(value) === false && value >= 1 && value <= 10) {
				return true;
            }
            console.log(" \n\nEnter a valid ID Number.\n");
			return false;
		}
    }, 
    {
		name: "productUnits",
		type: "input",
		message: "How many units of this product would you like to purchase?",
		validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            } else {
            console.log(" \n\nEnter a valid quantity.\n");
            return false;
            }
		},
    },
    ])

    .then(function(answer) {

        var quantity = parseInt(answer.productUnits);
        var itemID = parseInt(answer.productID);

        connection.query("SELECT * FROM products WHERE item_id=" + itemID, function (err, res) {
            if (err) throw err;

            // Varify item quantity desired is in inventory
            if (res[0].stock_quantity - quantity >= 0) {

                console.log("\n=======================================================================================================================\n",
                            "\n Bamazon has sufficient inventory of " + res[0].product_name + " to fulfill your request.\n"
                );

                // Calculate total sale
                console.log(" Your order total will be $" + (quantity * res[0].price).toFixed(2) + "\n",
                            "\n=======================================================================================================================\n"
                );
                
                // Update inventory                       
                connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [res[0].stock_quantity - quantity, itemID],

                function (err, res) {
                    if (err) throw err;

                    anotherPurchase();  // Asks user if they want to make another purchase
                });  

            }
            // Out of stock
            else {
                console.log("\n=======================================================================================================================\n",
                            "\n Insufficient Inventory To Fulfill Your Request\n",
                            "\n There are currently " + res[0].stock_quantity + " units of " + res[0].product_name + " in stock.\n",
                            "\n=======================================================================================================================\n"
                );

                anotherPurchase();  // Asks user if they want to make another purchase
            }
        });
    })
};

function anotherPurchase () {
    inquirer.prompt({
        name: "confirmPurchase",
        type: "confirm",
        message: "Would you like to make another purchase?",
        default: true
    })

    .then(function(confirmResponse) { 
        if (confirmResponse.confirmPurchase === true) {
            userPrompt();
        } else {
            console.log("\n=======================================================================================================================\n",
                        "\n Thank you. Come again.\n",
                        "\n=======================================================================================================================\n"
            );
            connection.end();
        }
    })
}