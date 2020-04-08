module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE product_tag(" +
            "product_id INT NOT NULL REFERENCES book, " +  
            "tag VARCHAR(80) NOT NULL, " + 
            "PRIMARY KEY(product_id, tag)" +
        ");\n"
    );
