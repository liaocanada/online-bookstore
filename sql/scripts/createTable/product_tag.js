module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE product_tag(" +
            "product_id INT NOT NULL, " +  // Foreign key removed since it needs to be applied on both product and book
            "tag VARCHAR(80) NOT NULL, " + 
            "PRIMARY KEY(product_id, tag)" +
        ");\n"
    );
