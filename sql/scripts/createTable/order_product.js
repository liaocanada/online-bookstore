module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE order_product(" +
            "order_number INT REFERENCES storeorder, " + 
            "product_id INT REFERENCES product, " + 
            "quantity INT NOT NULL, " + 
            "price NUMERIC(14, 2) NOT NULL, " +
            "PRIMARY KEY(order_number, product_id)" +
        ");\n"
    );
