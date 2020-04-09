const escape = require("pg-escape");

const bookToGenres = require("../dummyData/book_genre.json");

function addGenresForBook(book, outputStream) {
    const bookId = book.book_id;
    if (typeof(bookId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    const genres = bookToGenres[bookId];
    if (!genres) return;

    genres.forEach(genre => {
        const sqlFormat = 
            "INSERT INTO book_genre(product_id, genre) " + 
            `VALUES (${bookId}, %L);`;

        // Use pg-escape to escape strings
        const productGenreSql = escape(sqlFormat, genre);

        outputStream.write(productGenreSql + "\n");
    });
};

module.exports = addGenresForBook;