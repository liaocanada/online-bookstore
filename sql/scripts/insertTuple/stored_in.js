const escape = require("pg-escape");
const faker = require("faker");
faker.seed(123);

const warehouses = require("../dummyData/warehouses.json");

function mapToSqlStoredIn(product, outputStream, isBook = true) {
    const productId = isBook ? product.book_id : product.product_id;
    if (typeof(productId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }
    const warehouseName = faker.random.arrayElement(warehouses).name;
    const stock = isBook ? faker.random.number(2500) : product.stock;
    const aisle = faker.random.number(250);

    // Due to limitations on pg-escape module, 
    //     numbers are injected directly into the string and take no user input
    const sqlFormat = 
        "INSERT INTO stored_in(product_id, warehouse_name, stock, aisle) " + 
        `VALUES (${productId}, %L, ${stock}, ${aisle});`;

    // Use pg-escape to escape strings
    const storedInSql = escape(sqlFormat, warehouseName);

    outputStream.write(storedInSql + "\n");
};

module.exports = mapToSqlStoredIn;
