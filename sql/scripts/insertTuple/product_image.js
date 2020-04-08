const escape = require("pg-escape");

function addImagesForBook(book, outputStream) {
    const bookId = book.book_id;
    if (typeof(bookId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    const imageUrl = processImageUrl(book.image_url);
    if (!imageUrl) return;

    const sqlFormat = 
        "INSERT INTO product_image(product_id, image) " + 
        `VALUES (${bookId}, %L);`;

    // Use pg-escape to escape strings
    const productImageSql = escape(sqlFormat, imageUrl);

    outputStream.write(productImageSql + "\n");
};

function processImageUrl(url) {
    // TODO if url matches (https://images.gr-assets.com/books/<some-number>m/<some-number>.jpg)
    // then change the 'm' to a 'l'

    // Empty placeholder image -- don't store in database
    if (url === "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png")
        return null;

    return url;
}

module.exports = addImagesForBook;