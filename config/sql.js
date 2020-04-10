const path = require("path");

const config = {
    NUM_BOOKS: 100,
    NUM_WAREHOUSES: 5,
    NUM_USERS: 12,
    sources: {
        BOOKS_CSV: "https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv",
        BOOKS_TAGS_CSV: "https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/book_tags.csv",
        TAGS_CSV: "https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/tags.csv"
    },
    outputs: {
        BOOK_SQL: path.join(__dirname, "../sql/book.sql"),
        AUTHOR_SQL: path.join(__dirname, "../sql/author.sql"),
        WRITES_SQL: path.join(__dirname, "../sql/writes.sql"),
        PRODUCT_TAG_SQL: path.join(__dirname, "../sql/product_tag.sql"),
        PRODUCT_IMAGE_SQL: path.join(__dirname, "../sql/product_image.sql"),
        WAREHOUSE_SQL: path.join(__dirname, "../sql/warehouse.sql"),
        STORED_IN_SQL: path.join(__dirname, "../sql/stored_in.sql"),
        COUPON_SQL: path.join(__dirname, "../sql/coupon.sql"),
        BOOK_GENRE_SQL: path.join(__dirname, "../sql/book_genre.sql"),
        PUBLISHER_SQL: path.join(__dirname, "../sql/publisher.sql"),
        PUBLISHES_SQL: path.join(__dirname, "../sql/publishes.sql"),
        PRODUCT_SQL: path.join(__dirname, "../sql/product.sql"),
        
        ORDER_SQL: path.join(__dirname, "../sql/order.sql"),
        ORDER_PRODUCT_SQL: path.join(__dirname, "../sql/order_product.sql"),
        ORDER_COUPON_SQL: path.join(__dirname, "../sql/order_coupon.sql"),
        CART_SQL: path.join(__dirname, "../sql/cart.sql"),
        CART_PRODUCT_SQL: path.join(__dirname, "../sql/cart_product.sql"),
        CART_COUPON_SQL: path.join(__dirname, "../sql/cart_coupon.sql"),

        USER_SQL: path.join(__dirname, "../sql/user.sql"),
        USER_ROLE_SQL: path.join(__dirname, "../sql/user_role.sql"),
        ROLE_SQL: path.join(__dirname, "../sql/role.sql"),

        COMBINED_SQL: path.join(__dirname, "../sql/$combined.sql"),
    }
};

module.exports = config;