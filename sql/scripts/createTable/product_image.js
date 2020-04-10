module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE product_image(" +
            "product_id INT NOT NULL, " +  // Foreign key removed since it needs to be applied on both product and book
            "image VARCHAR(2047) NOT NULL, " + 
            "PRIMARY KEY(product_id, image)" +
        ");\n"
    );
