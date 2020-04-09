const escape = require("pg-escape");

function addProduct(product, outputStream) {
    const {
        product_id,
        name,
        description,
        price,
        publisher_price,
        sold_count
    } = product;

    if (typeof(product_id) !== "number" || 
        typeof(price) !== "number" || 
        typeof(publisher_price) !== "number" ||
        typeof(sold_count) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    const sqlFormat = "INSERT INTO product" + 
        "(product_id, name, description, price, publisher_price, sold_count) " + 
        "VALUES " +
            `(${product_id}, %L, %L, ${price}, ${publisher_price}, ${sold_count});`;

    // Use pg-escape to escape strings
    const productSql = escape(sqlFormat, name, description);

    outputStream.write(productSql + "\n");
};

module.exports = addProduct;