module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE coupon(" +
            "coupon_code VARCHAR(80) PRIMARY KEY, " + 
            "is_percent BOOLEAN NOT NULL, " + 
            "savings NUMERIC(8, 2) NOT NULL, " + 
            "valid_from TIMESTAMP, " + 
            "valid_to TIMESTAMP" + 
        ");\n"
    );
