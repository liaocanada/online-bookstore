const papa = require("papaparse");
const request = require("request");
const fs = require("fs");
const path = require("path");

// SQL string for creating tables
const createBooksSql = require("./createTable/books");

// Functions to map objects into SQL for inserting tuples
const insertBooksSql = require("./insertTuple/books");

// Output file paths
const outputBooksPath = path.join(__dirname, "../../sql/books.sql");


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
fs.writeFileSync(outputBooksPath, createBooksSql + "\n");

// Create write streams
const booksSqlStream = fs.createWriteStream(outputBooksPath, {flags: "a+"});


// Map objects to SQL using imported functions
parseStream.on("data", book => {
    booksSqlStream.write(insertBooksSql(book) + "\n");
});

parseStream.on("finish", () => {
    console.log(`Generated SQL to: ${outputBooksPath}`);
    console.log("Done.");
    booksSqlStream.end();
});
