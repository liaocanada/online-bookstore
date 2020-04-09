const escape = require("pg-escape");

function addImageForProduct(product, outputStream, isBook = true) {
    const productId = isBook ? product.book_id : product.product_id;
    if (typeof(productId) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    const imageUrl = isBook ? processImageUrl(product.image_url) : product.image;
    if (!imageUrl) return;

    const sqlFormat = 
        "INSERT INTO product_image(product_id, image) " + 
        `VALUES (${productId}, %L);`;

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

module.exports = addImageForProduct;