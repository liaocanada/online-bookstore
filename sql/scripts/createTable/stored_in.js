module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE stored_in(" +
            "product_id INT PRIMARY KEY REFERENCES book, " +  
            "name VARCHAR(80) NOT NULL REFERENCES warehouse, " + 
            "stock INT NOT NULL, " + 
            "aisle INT" + 
        ");\n"
    );
