module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE book_genre(" +
            "product_id INT NOT NULL REFERENCES book, " +  
            "genre VARCHAR(80) NOT NULL, " + 
            "PRIMARY KEY(product_id, genre)" +
        ");\n"
    );
