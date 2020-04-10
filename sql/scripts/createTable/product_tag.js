module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE product_tag(" +
            "product_id INT NOT NULL, " +  // TODO replace with a SQL trigger
            "tag VARCHAR(80) NOT NULL, " + 
            "PRIMARY KEY(product_id, tag)" +
        ");\n"
    );
