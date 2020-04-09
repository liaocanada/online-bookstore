const escape = require("pg-escape");

function mapToCouponSql(coupon, outputStream) {
    const { coupon_code, is_percent, savings, valid_from, valid_to } = coupon;
    if (typeof(savings) !== "number" || typeof(is_percent) !== "boolean") {
        throw new Error("Risk of SQL injection!");
    } 

    // Due to limitations on pg-escape module, numbers are injected directly into the string
    // Numbers don't come from user input
    const sqlFormat = 
        "INSERT INTO coupon(coupon_code, is_percent, savings, valid_from, valid_to) " + 
        `VALUES (%L, ${is_percent}, ${savings}, %L, %L);`;

    // Use pg-escape to escape strings
    const couponSql = escape(sqlFormat, coupon_code, valid_from, valid_to);

    outputStream.write(couponSql + "\n");
};

module.exports = mapToCouponSql;