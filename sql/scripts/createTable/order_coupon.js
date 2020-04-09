module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE order_coupon(" +
            "order_number INT REFERENCES storeorder, " + 
            "username VARCHAR(255) REFERENCES storeorder, " + 
            "coupon_code VARCHAR(80) REFERENCES coupon, " + 
            "PRIMARY KEY(order_number, username, coupon_code)" +
        ");\n"
    );
