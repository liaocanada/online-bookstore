CREATE TABLE cart_product(username VARCHAR(255) REFERENCES cart, product_id INT, quantity INT NOT NULL, PRIMARY KEY(username, product_id));
