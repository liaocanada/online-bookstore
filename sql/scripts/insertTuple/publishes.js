const escape = require("pg-escape");
const faker = require("faker");
faker.seed(123);

function addPublishes(product, publisher, outputStream, isBook = true) {
    const product_id = isBook ? product.book_id : product.product_id;
    const publisher_name = publisher;
    const year_published = isBook ? product.original_publication_year : product.year_published;
    const reorder_threshold = faker.random.arrayElement([-1, 25, 50, 75, 100, 250, 500, 1000]);
    const commission_percent = parseFloat(faker.finance.amount(20, 75, 2));

    if (typeof(year_published) !== "number") {
        throw new Error("Risk of SQL injection!");
    }

    const sqlFormat = 
        "INSERT INTO publishes" + 
            "(product_id, publisher_name, year_published, reorder_threshold, commission_percent) " + 
        "VALUES " +
            `(${product_id}, %L, ${year_published}, ${reorder_threshold}, ${commission_percent});`;

    // Use pg-escape to escape strings
    const publishesSql = escape(sqlFormat, publisher_name);

    outputStream.write(publishesSql + "\n");
};

module.exports = addPublishes;