## Bamazon 
### An amazon-like storefront built with Node.js and MySQL

- - -

### Overview

In this activity, I be created an Amazon-like storefront with the MySQL skills I learned in this unit. The app will take in orders from customers and deplete stock from the store's inventory

- - -

### Function

#### Customer Demo <a id="customer-demo"></a>
The customer interface:

```
1) Presents the customer with a list of all available products
2) Asks for the ID of the customer's desired product
3) Asks how many units the customer would like to purchase
4) Confirms order & updates product inventory in database
5) Asks customer if they would like to make another purchase
```
- - -

### Setup
To run this application, you will need [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html) and [Node.js](https://nodejs.org/en/download/) installed on your computer.

#### Install MySQL

In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the MySQL installation page to install the version you need for your operating system. Once you have MySQL isntalled, you will be able to create the `bamazon` database and the `products` table with the SQL code found in `bamazon.sql`. Run this code inside your MySQL client to populate the database, then you will be ready to proceed with running the Bamazon customer interface.

#### Run Application
Once you have the Bamazon database set up, run these commands in the command line:

```
git clone https://github.com/matthewemichael/bamazon.git
cd bamazon
npm install
node bamazonCustomer.js
```
- - -

### Technologies Used

* [JavaScript](https://www.javascript.com)
* [Node.Js](https://nodejs.org/en/)
* Node Packages
  * [MySQL](https://www.npmjs.com/package/mysql)
  * [Inquirer](https://www.npmjs.com/package/inquirer)
