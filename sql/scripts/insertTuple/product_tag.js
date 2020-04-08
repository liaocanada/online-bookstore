const escape = require("pg-escape");

const getTagMap = require("./helpers/getTagMap");

function addTagsForBook(book, outputStream) {
    const bookId = book.book_id;
    if (typeof(bookId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    getTagMap().then(tagMap => {
        // Lookup tags by bookId
        const tags = tagMap[bookId];
        if (!tags) return;
        
        tags.forEach(tag => {
            // Due to limitations on pg-escape module, numbers are injected directly into the string
            const sqlFormat = 
                "INSERT INTO product_tag(product_id, tag) " + 
                `VALUES (${bookId}, %L);`;
    
            // Use pg-escape to escape strings
            const productTagSql = escape(sqlFormat, tag.toString());
    
            outputStream.write(productTagSql + "\n");
        });
    });
};

module.exports = addTagsForBook;