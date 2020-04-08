module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE product_image(" +
            "product_id INT NOT NULL REFERENCES book, " +  
            "image VARCHAR(2047) NOT NULL, " + 
            "PRIMARY KEY(product_id, image)" +
        ");\n"
    );
