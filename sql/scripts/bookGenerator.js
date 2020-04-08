const papa = require("papaparse");
const request = require("request");
const fs = require("fs");
const path = require("path");

// SQL string for creating tables
const createBook = require("./createTable/book");
const createAuthor = require("./createTable/author");
const createWrites = require("./createTable/writes");

// Functions to map objects into SQL for inserting tuples
const insertBook = require("./insertTuple/book");
const insertAuthor = require("./insertTuple/author");
const insertWrites = require("./insertTuple/writes");

// Output file paths
const outputBooksPath = path.join(__dirname, "../../sql/book.sql");
const outputAuthorsPath = path.join(__dirname, "../../sql/author.sql");
const outputWritesPath = path.join(__dirname, "../../sql/writes.sql");

// Get raw CSV data from GitHub source and parse into JSON
const parseOptions = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    preview: 100,
};
const dataStream = request.get("https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv");
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, parseOptions);
dataStream.pipe(parseStream);

// Clear files and create write streams
fs.writeFileSync(outputBooksPath, "");
fs.writeFileSync(outputAuthorsPath, "");
fs.writeFileSync(outputWritesPath, "");
const booksSqlStream = fs.createWriteStream(outputBooksPath, {flags: "a+"});
const authorsSqlStream = fs.createWriteStream(outputAuthorsPath, {flags: "a+"});
const writesSqlStream = fs.createWriteStream(outputWritesPath, {flags: "a+"});

// Add create table statements to SQL
createBook(booksSqlStream);
createAuthor(authorsSqlStream);
createWrites(writesSqlStream);

// Map objects to SQL using imported functions
const uniqueAuthors = new Set();

parseStream.on("data", book => {
    // Add book
    insertBook(book, booksSqlStream);
    
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
    console.log(`Generated SQL to: ${outputBooksPath}`);
    console.log(`Generated SQL to: ${outputAuthorsPath}`);
    console.log(`Generated SQL to: ${outputWritesPath}`);
    booksSqlStream.end();
    authorsSqlStream.end();
    writesSqlStream.end();
    console.log("Done.");
});
