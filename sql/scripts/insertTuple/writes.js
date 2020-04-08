const escape = require("pg-escape");

function mapToSqlWrites(bookId, authorName) {
    if (typeof(bookId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    // Due to limitations on pg-escape module, numbers are injected directly into the string
    const sqlFormat = 
        "INSERT INTO writes(product_id, name) " + 
        `VALUES (${bookId}, %L);`;

    // Use pg-escape to escape strings
    const bookSql = escape(sqlFormat, authorName);

    return bookSql;
};

module.exports = mapToSqlWrites;