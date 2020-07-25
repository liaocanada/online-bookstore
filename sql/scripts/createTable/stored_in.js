module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE stored_in(" +
            "product_id INT PRIMARY KEY, " + // TODO replace with a SQL trigger
            "warehouse_name VARCHAR(80) NOT NULL REFERENCES warehouse, " + 
            "stock INT NOT NULL, " + 
            "aisle INT" + 
        ");\n"
    );
