module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE cart_product(" +
            "username VARCHAR(255) REFERENCES cart, " +
            "product_id INT, " +   // TODO replace with a SQL trigger
            "quantity INT NOT NULL, " +
            "PRIMARY KEY(username, product_id)" +
        ");\n"
    );
