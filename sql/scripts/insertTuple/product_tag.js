const escape = require("pg-escape");

const getTagMap = require("../helpers/getTagMap");

function addTagsForProduct(product, outputStream, isBook = true) {
    // If it's a book, we'll have to look up its tags online
    if (isBook) addTagsForBook(product, outputStream);

    // If it's a product it should have a product.tags attribute
    else insertTags(product.product_id, product.tags, outputStream);
}

function addTagsForBook(book, outputStream) {
    const bookId = book.book_id;
    if (typeof(bookId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    getTagMap().then(tagMap => {
        // Lookup tags by bookId
        const tags = tagMap[bookId];
        insertTags(bookId, tags, outputStream);
    });
};

function insertTags(productId, tags, outputStream) {
    if (!tags) return;
        
    tags.forEach(tag => {
        // Due to limitations on pg-escape module, numbers are injected directly into the string
        const sqlFormat = 
            "INSERT INTO product_tag(product_id, tag) " + 
            `VALUES (${productId}, %L);`;

        // Use pg-escape to escape strings
        const productTagSql = escape(sqlFormat, tag.toString());

        outputStream.write(productTagSql + "\n");
    });
};

module.exports = addTagsForProduct;