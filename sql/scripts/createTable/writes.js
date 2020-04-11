module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE writes(" +
            "product_id INT NOT NULL REFERENCES book, " +  
            "author_name VARCHAR(80) NOT NULL REFERENCES author(name), " + 
            "PRIMARY KEY(product_id, author_name)" +
        ");\n"
    );
