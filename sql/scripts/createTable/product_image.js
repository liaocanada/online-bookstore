module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE product_image(" +
            "product_id INT NOT NULL, " +  // TODO replace with a SQL trigger
            "image VARCHAR(2047) NOT NULL, " + 
            "PRIMARY KEY(product_id, image)" +
        ");\n"
    );
