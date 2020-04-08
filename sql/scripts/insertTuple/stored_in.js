const escape = require("pg-escape");
const faker = require("faker");
faker.seed(123);

const warehouses = require("../dummyData/warehouses.json");

function mapToSqlStoredIn(book, outputStream) {
    const bookId = book.book_id;
    if (typeof(bookId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }
    const warehouseName = faker.random.arrayElement(warehouses).name;
    const stock = faker.random.number(2500);
    const aisle = faker.random.number(250);

    // Due to limitations on pg-escape module, 
    //     numbers are injected directly into the string and take no user input
    const sqlFormat = 
        "INSERT INTO stored_in(product_id, name, stock, aisle) " + 
        `VALUES (${bookId}, %L, ${stock}, ${aisle});`;

    // Use pg-escape to escape strings
    const storedInSql = escape(sqlFormat, warehouseName);

    outputStream.write(storedInSql + "\n");
};

module.exports = mapToSqlStoredIn;