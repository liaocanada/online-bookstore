const fs = require("fs");
const faker = require("faker");
faker.seed(123);

const config = require("../../config/sql");
const products = require("./dummyData/products.json");

// For creating product table
const createProduct = require("./createTable/product");

// Functions to insert SQL statements
const insertProduct = require("./insertTuple/product");
const insertProductTag = require("./insertTuple/product_tag");
const insertProductImage = require("./insertTuple/product_image");
const insertStoredIn = require("./insertTuple/stored_in");
const insertPublisher = require("./insertTuple/publisher");
const insertPublishes = require("./insertTuple/publishes");

// Create write streams for appending
const writeFlag = {flags: "w"};
const appendFlag = {flags: "a"};
const productSqlStream = fs.createWriteStream(config.outputs.PRODUCT_SQL, writeFlag);
const productTagSqlStream = fs.createWriteStream(config.outputs.PRODUCT_TAG_SQL, appendFlag);
const productImageSqlStream = fs.createWriteStream(config.outputs.PRODUCT_IMAGE_SQL, appendFlag);
const storedInSqlStream = fs.createWriteStream(config.outputs.STORED_IN_SQL, appendFlag);
const publisherSqlStream = fs.createWriteStream(config.outputs.PUBLISHER_SQL, appendFlag);
const publishesSqlStream = fs.createWriteStream(config.outputs.PUBLISHES_SQL, appendFlag);

// Create product table
createProduct(productSqlStream);

// Add publishers associated with the product
// Assume the only one is "Very Cool Publisher Inc"
insertPublisher(products[0].publisher, publisherSqlStream);

products.forEach(product => {
    // Add the product
    insertProduct(product, productSqlStream);

    // Add product-tags
    insertProductTag(product, productTagSqlStream, false);

    // Add product-image
    insertProductImage(product, productImageSqlStream, false);

    // Add product-warehouse
    insertStoredIn(product, storedInSqlStream, false);

    // Add product-publisher
    insertPublishes(product, product.publisher, publishesSqlStream, false);
});

console.log(`Generated SQL to: ${config.outputs.PRODUCT_SQL}`);
console.log(`Appended SQL to: ${config.outputs.PRODUCT_TAG_SQL}`);
console.log(`Appended SQL to: ${config.outputs.PRODUCT_IMAGE_SQL}`);
console.log(`Appended SQL to: ${config.outputs.STORED_IN_SQL}`);
console.log(`Appended SQL to: ${config.outputs.PUBLISHER_SQL}`);
console.log(`Appended SQL to: ${config.outputs.PUBLISHES_SQL}`);
productSqlStream.end();
productTagSqlStream.end();
productImageSqlStream.end();
storedInSqlStream.end();
publisherSqlStream.end();
publishesSqlStream.end();