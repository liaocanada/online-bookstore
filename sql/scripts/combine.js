const fs = require("fs");

const config = require("../../config/sql");

// Define order of SQL
const order = [
    config.outputs.AUTHOR_SQL,
    config.outputs.BOOK_SQL,
    config.outputs.COUPON_SQL,
    config.outputs.PRODUCT_SQL,
    config.outputs.PUBLISHER_SQL,
    config.outputs.WAREHOUSE_SQL,
    config.outputs.ORDER_SQL,
    config.outputs.CART_SQL,
    config.outputs.BOOK_GENRE_SQL,
    config.outputs.PRODUCT_IMAGE_SQL,
    config.outputs.PRODUCT_TAG_SQL,
    config.outputs.CART_COUPON_SQL,
    config.outputs.CART_PRODUCT_SQL,
    config.outputs.ORDER_COUPON_SQL,
    config.outputs.ORDER_PRODUCT_SQL,
    config.outputs.PUBLISHES_SQL,
    config.outputs.STORED_IN_SQL,
    config.outputs.WRITES_SQL
];

fs.writeFileSync(config.outputs.COMBINED_SQL, "", {flag: "w"});

order.forEach(fileToCopy => {
    const data = fs.readFileSync(fileToCopy);
    fs.writeFileSync(config.outputs.COMBINED_SQL, data + "\n", {flag: "a"});
    console.log("Copied", fileToCopy);
});

console.log("All SQL files combined and saved to", config.outputs.COMBINED_SQL);
