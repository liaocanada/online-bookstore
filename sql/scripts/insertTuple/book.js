const escape = require("pg-escape");
const faker = require("faker");
faker.seed(123);

function mapToSqlBook(book) {
    const name = book.original_title;
    const description = getDescription(book);
    const price = parseFloat(faker.commerce.price(4.99, 29.99, 2));
    const publisherPrice = parseFloat(faker.finance.amount(0.3*price, 0.8*price, 2));
    const soldCount = faker.random.number({min: 0, max: 50000});
    const isbn = book.isbn.toString();  // ISBN might be number or string
    const series = getSeries(book);
    const format = faker.random.arrayElement(["paperback", "paperback", "paperback", "hardcover", "ebook"]);
    const pages = faker.random.number({min: 100, max: 500});

    // Due to limitations on pg-escape module, numbers are injected directly into the string
    // All numbers take no user input, no chance of SQL injection
    const sqlFormat = "INSERT INTO book" + 
        "(name, description, price, publisher_price, sold_count, " + 
            "isbn, series, format, pages) " + 
        "VALUES " +
            `(%L, %L, ${price}, ${publisherPrice}, ${soldCount}, ` + 
            `%L, %L, %L, ${pages});`;

    // Use pg-escape to escape strings
    const bookSql = escape(sqlFormat,
        name, 
        description,
        isbn,
        series,
        format,
    );

    return bookSql;
};

function getDescription(book) {
    // `\nDROP sampletable;'\nSELECT * FROM members; DROP members----A book \n  called ${book.title} published in ${book.original_publication_year} ` + 
    return `A book called ${book.title} published in ${book.original_publication_year} ` + 
        `and rated ${book.average_rating} (${book.ratings_count} reviews)`
};

function getSeries(book) {
    // Title is in the format: Bridget Jones's Diary (Bridget Jones, #1)
    if (!book.title) return null;
    const title = book.title.toString();
    
    if (title.includes("(") && 
        title.includes(")") && 
        title.includes("#") &&
        title.includes(",")) {
            const startIndex = title.lastIndexOf("(") + 1;
            const endIndex = title.lastIndexOf(",");
            return title.substring(startIndex, endIndex);
    }
    else return null;
};

module.exports = mapToSqlBook;