const papa = require("papaparse");
const request = require("request");
const escape = require("pg-escape");
const faker = require("faker");
const fs = require("fs");
const path = require("path");

faker.seed(123);

const parseOptions = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    preview: 100,
};
const dataStream = request.get("https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv");
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, parseOptions);
dataStream.pipe(parseStream);

const booksSqlFile = path.join(__dirname, "../../sql/books.sql");
fs.writeFileSync(booksSqlFile, "");
const booksSqlStream = fs.createWriteStream(booksSqlFile, {flags: "a+"});

const createSqlBook = "CREATE TABLE books(" +
    "product_id SERIAL PRIMARY KEY REFERENCES products," +  // TODO is this valid?
    "name VARCHAR(255)," + 
    "description VARCHAR(2047)," + 
    "price NUMERIC(8, 2)," + 
    "publisher_price NUMERIC(8, 2)," + 
    "sold_count INT," + 
    "isbn VARCHAR(9)," + 
    "series VARCHAR(255)," + 
    "format VARCHAR(255)," + 
    "pages INT" + 
");";

const mapToSqlBook = book => {
    const getSeries = () => {
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

    const price = parseFloat(faker.commerce.price(4.99, 29.99, 2));
    const publisherPrice = parseFloat(faker.finance.amount(0.3*price, 0.8*price, 2));
    const soldCount = faker.random.number({min: 0, max: 50000});
    const series = getSeries();
    const format = faker.random.arrayElement(["paperback", "paperback", "paperback", "hardcover", "ebook"]);
    const pages = faker.random.number({min: 100, max: 500});

    const sqlFormat = "INSERT INTO books " + 
        "(name, description, price, publisher_price, sold_count, " + 
            "isbn, series, format, pages) " + 
        "VALUES " +
            `(%L, %L, ${price}, ${publisherPrice}, ${soldCount}, ` + 
            `%L, %L, %L, ${pages});`;

    const bookSql = escape(sqlFormat,
        book.original_title, 
        // `\nDROP sampletable;'\nSELECT * FROM members; DROP members----A book \n  called ${book.title} published in ${book.original_publication_year} ` + 
        `A book called ${book.title} published in ${book.original_publication_year} ` + 
            `and rated ${book.average_rating} (${book.ratings_count} reviews)`,
        book.isbn.toString(),  // ISBN might be number or string
        series,
        format,
    );

    return bookSql;
};


booksSqlStream.write(createSqlBook);
parseStream.on("data", book => {
    booksSqlStream.write(mapToSqlBook(book) + "\n");
});

parseStream.on("finish", () => {
    console.log("Done.");
    booksSqlStream.end();
});
