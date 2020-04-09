module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE order_product(" +
            "order_number INT REFERENCES order, " + 
            "username VARCHAR(255) REFERENCES order, " +
            "product_id INT REFERENCES product, " + 
            "quantity INT NOT NULL, " + 
            "price NUMERIC(14, 2) NOT NULL, " +
            "PRIMARY KEY(order_number, username, product_id)" +
        ");\n"
    );
