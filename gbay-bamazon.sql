DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(5, 2) default 0,
  stock_quantity INT(5) default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE
("LARDAC Health Kit", "Home & Garden", 9.99, 10),
("Hangman Herb Garden", "Home & Garden", 4.99, 10),
("Salabar Shaker", "Home & Garden", 7.99, 4),
("Rock For Brains", "Games", 59.99, 7),
("Paper Blast", "Games", 59.99, 5),
("Scissor Sorcerers", "Games", 59.99, 6),
("Joe Spresso", "Grocery", 7.99, 10),
("Space Jam", "Grocery", 3.99, 10),
("Toon Trivia Tea", "Grocery", 4.99, 7),
("Liri Lip Gloss", "Health & Beauty", 12.99, 4),
("Game Roster Salt Bath", "Health & Beauty", 8.99, 10),
("SQL Shaving Cream", "Health & Beauty", 4.99, 8);
  

