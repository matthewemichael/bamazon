DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);

Select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Inflatable Banana Costume", "Fashion", 14.99, 5),
("Large Plant Pot", "Garden", 58.90, 20),
("Heinz Beanz", "Food", 3.00, 50),
("PlayStaion 4 Pro", "Electronics", 362.00, 10),
("USB Flash Drive", "Electronics", 10.95, 100),
("Plant Stand", "Garden", 18.99, 30),
("Fila Neon Fanny Pack", "Fashion", 25.00, 5),
("Jack Link's Beef Jerky", "Food", 7.00, 75),
("Fish Oil for Dogs", "Pet Supplies", 31.28, 10),
("Bacon Scented Dog Ball", "Pet Supplies", 5.67, 200);