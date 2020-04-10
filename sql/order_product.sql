CREATE TABLE order_product(order_number INT REFERENCES storeorder(order_number), product_id INT, quantity INT NOT NULL, price NUMERIC(14, 2) NOT NULL, PRIMARY KEY(order_number, product_id));
