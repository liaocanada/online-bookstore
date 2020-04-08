const escape = require("pg-escape");

function mapToSqlWrites(bookId, authorName, outputStream) {
    if (typeof(bookId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    // Due to limitations on pg-escape module, numbers are injected directly into the string
    const sqlFormat = 
        "INSERT INTO writes(product_id, name) " + 
        `VALUES (${bookId}, %L);`;

    // Use pg-escape to escape strings
    const writesSql = escape(sqlFormat, authorName);

    outputStream.write(writesSql + "\n");
};

module.exports = mapToSqlWrites;