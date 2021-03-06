module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE storeorder(" +
            "order_number SERIAL UNIQUE, " + 
            "username VARCHAR(255) REFERENCES storeuser, " + 
            "status VARCHAR(80) NOT NULL, " + 
            "billed_to VARCHAR(2047), " + 
            "shipped_to VARCHAR(2047), " + 
            "time_placed TIMESTAMP NOT NULL, " + 
            "delivery_fee NUMERIC(8, 2) NOT NULL, " +
            "PRIMARY KEY(order_number, username)" +
        ");\n"
    );
