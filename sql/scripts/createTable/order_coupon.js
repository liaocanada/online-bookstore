module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE order_coupon(" +
            "order_number INT, " + 
            "username VARCHAR(255), " + 
            "coupon_code VARCHAR(80) REFERENCES coupon, " + 
            "PRIMARY KEY(order_number, username, coupon_code), " +
            "FOREIGN KEY(order_number, username) REFERENCES storeorder" +
        ");\n"
    );
