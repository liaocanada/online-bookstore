const papa = require("papaparse");
const request = require("request");
const fs = require("fs");

const config = require("../../config/sql");

// SQL string for creating tables
const createBook = require("./createTable/book");
const createAuthor = require("./createTable/author");
const createWrites = require("./createTable/writes");
const createProductTag = require("./createTable/product_tag");
const createProductImage = require("./createTable/product_image");
const createStoredIn = require("./createTable/stored_in");

// Functions to map objects into SQL for inserting tuples
const insertBook = require("./insertTuple/book");
const insertAuthor = require("./insertTuple/author");
const insertWrites = require("./insertTuple/writes");
const insertProductTag = require("./insertTuple/product_tag");
const insertProductImage = require("./insertTuple/product_image");
const insertStoredIn = require("./insertTuple/stored_in");

// Get raw CSV data from GitHub source and parse into JSON
const parseOptions = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    preview: config.NUM_BOOKS,
};
const dataStream = request.get(config.sources.BOOKS_CSV);
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, parseOptions);
dataStream.pipe(parseStream);

// Create write streams
const writeFlag = {flags: "w"};  // Creates/clears file
const booksSqlStream = fs.createWriteStream(config.outputs.BOOK_SQL, writeFlag);
const authorsSqlStream = fs.createWriteStream(config.outputs.AUTHOR_SQL, writeFlag);
const writesSqlStream = fs.createWriteStream(config.outputs.WRITES_SQL, writeFlag);
const productTagSqlStream = fs.createWriteStream(config.outputs.PRODUCT_TAG_SQL, writeFlag);
const productImageSqlStream = fs.createWriteStream(config.outputs.PRODUCT_IMAGE_SQL, writeFlag);
const storedInSqlStream = fs.createWriteStream(config.outputs.STORED_IN_SQL, writeFlag);

// Add create table statements to SQL
createBook(booksSqlStream);
createAuthor(authorsSqlStream);
createWrites(writesSqlStream);
createProductTag(productTagSqlStream);
createProductImage(productImageSqlStream);
createStoredIn(storedInSqlStream);

// Map objects to SQL using imported functions
const uniqueAuthors = new Set();

parseStream.on("data", book => {
    // Add book
    insertBook(book, booksSqlStream);

    // Add tags associated with the book
    insertProductTag(book, productTagSqlStream);

    // Add image associated with the book
    insertProductImage(book, productImageSqlStream);
    
    // Add warehouse associated with the book
    insertStoredIn(book, storedInSqlStream);

    const authors = book.authors.split(", ");
    authors.forEach(author => {
        // Add author
        if (!uniqueAuthors.has(author)) {
            uniqueAuthors.add(author);
            insertAuthor(author, authorsSqlStream);
        }

        // Add book-author
        insertWrites(book.book_id, author, writesSqlStream);
    });
});

parseStream.on("finish", () => {
    console.log(`Generated SQL to: ${config.outputs.AUTHOR_SQL}`);
    console.log(`Generated SQL to: ${config.outputs.BOOK_SQL}`);
    console.log(`Generated SQL to: ${config.outputs.PRODUCT_IMAGE_SQL}`);
    console.log(`Generated SQL to: ${config.outputs.STORED_IN_SQL}`);
    console.log(`Generated SQL to: ${config.outputs.WRITES_SQL}`);
    authorsSqlStream.end();
    booksSqlStream.end();
    productImageSqlStream.end();
    storedInSqlStream.end();
    writesSqlStream.end();
});
