USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE
("LARDAC Health Kit", "Home & Garden", 9.99, 10),
("Hangman Herb Garden", "Home & Garden", 4.99, 10),
("Salabar Shaker", "Home & Garden", 7.99, 4),
("Rock For Brains", "Games", 59.99, 7),
("Paper Blast", "Games", 59.99, 5),
("Scissor Sorcerers", "Games", 59.99, 6),
("Joe Spresso", "Grocery", 7.99, 10),
("Space Jam", "Grocery", 3.99, 10),
("Firebase Hot Sauce", "Grocery", 4.99, 3),
("Toon Trivia Tea", "Grocery", 4.99, 7),
("Liri Lip Gloss", "Health & Beauty", 12.99, 4),
("Game Roster Salt Bath", "Health & Beauty", 8.99, 10),
("SQL Shaving Cream", "Health & Beauty", 4.99, 8);
  
INSERT INTO departments (department_name, overhead_cost) VALUE
("Home & Garden", 150),
("Games", 250),
("Grocery", 175),
("Health & Beauty", 125);

