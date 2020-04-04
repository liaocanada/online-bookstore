const papa = require("papaparse");
const request = require("request");
const escape = require("pg-escape");

const createTable = "CREATE TABLE books(" +
        "product_id SERIAL PRIMARY KEY REFERENCES products," +  // TODO is this valid?
        "name VARCHAR(255)," + 
        "description VARCHAR(2047)," + 
        "price NUMERIC(8, 2)," + 
        "publisher_price NUMERIC(8, 2)," + 
        "sold_count INT," + 
        "isbn INT," + 
        "series VARCHAR(255)," + 
        "format VARCHAR(255)," + 
        "pages INT" + 
    ");";
console.log(createTable);

const createSqlTransformStream = () => {
    const mapToSql = (book, encoding, callback) => {
        const inject = {
            publication_year: book.original_publication_year,
            average_rating: book.average_rating,
            ratings_count: book.ratings_count,
            isbn: book.isbn
        };
        const hasNonNumber = Object.values(inject).find(val => typeof(val) !== "number");
        if (hasNonNumber) {
            throw new Error("Risk of SQL injection!");
        }

        const format = "INSERT INTO books " + 
            "(name, description, price, publisher_price, sold_count, " + 
                "isbn, series, format, pages) " + 
            "VALUES " +
                `(%L, %L, 12, 11, 123213, ` + 
                `${inject.isbn}, 'todo-series', 'random(paperback, hardcover, ebook)', 123);`;

        const bookSql = escape(
            format,
            book.original_title, 
            // `\nDROP sampletable;'\nSELECT * FROM members; DROP members----A book \n  called ${book.title} published in ${book.original_publication_year} ` + 
            `A book called ${book.title} published in ${book.original_publication_year} ` + 
                `and rated ${book.average_rating} (${book.ratings_count} reviews)`
        );

        callback(null, bookSql);
    };

    return new require("stream").Transform({
        writableObjectMode: true,
        transform: mapToSql
    });
};

const options = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    preview: 100,
};
const dataStream = request.get("https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv");
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
const sqlTransformStream = createSqlTransformStream();

dataStream
    .pipe(parseStream)  // to object
    .pipe(sqlTransformStream);  // to string


let data = "";
sqlTransformStream.on("data", chunk => {
    data += chunk + "\n";
});

parseStream.on("finish", () => {
    console.log(data);
});
