module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE cart_coupon(" +
            "username VARCHAR(255) REFERENCES cart, " + 
            "coupon_code VARCHAR(80) REFERENCES coupon, " + 
            "PRIMARY KEY(username, coupon_code)" +
        ");\n"
    );
