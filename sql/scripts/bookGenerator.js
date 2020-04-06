const papa = require("papaparse");
const request = require("request");
const fs = require("fs");
const path = require("path");

// SQL string for creating tables
const createBookSql = require("./createTable/book");
const createAuthorSql = require("./createTable/author");

// Functions to map objects into SQL for inserting tuples
const insertBookSql = require("./insertTuple/book");
const insertAuthorSql = require("./insertTuple/author");

// Output file paths
const outputBooksPath = path.join(__dirname, "../../sql/book.sql");
const outputAuthorsPath = path.join(__dirname, "../../sql/author.sql");

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

// Replace files with create SQL
fs.writeFileSync(outputBooksPath, createBookSql + "\n");
fs.writeFileSync(outputAuthorsPath, createAuthorSql + "\n");

// Create write streams
const booksSqlStream = fs.createWriteStream(outputBooksPath, {flags: "a+"});
const authorsSqlStream = fs.createWriteStream(outputAuthorsPath, {flags: "a+"});


// Map objects to SQL using imported functions
const uniqueAuthors = new Set();

parseStream.on("data", book => {
    booksSqlStream.write(insertBookSql(book) + "\n");
    
    const authors = book.authors.split(", ");
    authors.forEach(author => {
        if (!uniqueAuthors.has(author)) {
            uniqueAuthors.add(author);
            authorsSqlStream.write(insertAuthorSql(author) + "\n");
        }

        // TODO add entry to book-author
    });
});

parseStream.on("finish", () => {
    console.log(`Generated SQL to: ${outputBooksPath}`);
    console.log(`Generated SQL to: ${outputAuthorsPath}`);
    booksSqlStream.end();
    authorsSqlStream.end();
    console.log("Done.");
});
