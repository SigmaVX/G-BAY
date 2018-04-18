DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(5, 2) default 0,
  stock_quantity INT(5) default 0,
  product_sales DECIMAL(5, 2) default 0,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  overhead_cost DECIMAL(10, 2) default 0,
  product_sales DECIMAL(10, 2) default 0,
  total_profit DECIMAL(10, 2) AS (product_sales - overhead_cost),
  PRIMARY KEY (department_id)
);

