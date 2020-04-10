module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE stored_in(" +
            "product_id INT PRIMARY KEY, " +  // Foreign key removed since it needs to be applied on both product and book
            "name VARCHAR(80) NOT NULL REFERENCES warehouse, " + 
            "stock INT NOT NULL, " + 
            "aisle INT" + 
        ");\n"
    );
