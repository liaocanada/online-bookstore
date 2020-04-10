module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE order_coupon(" +
            "order_number INT REFERENCES storeorder, " + 
            "coupon_code VARCHAR(80) REFERENCES coupon, " + 
            "PRIMARY KEY(order_number, coupon_code)" +
        ");\n"
    );
