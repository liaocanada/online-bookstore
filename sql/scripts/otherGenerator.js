// This one is responsible for generating all the relations that don't need dummy data
// More specifically: Order, Order_coupon, Order_product, Cart, Cart_product, Cart_coupon
const fs = require("fs");

const config = require("../../config/sql");

const createOrder = require("./createTable/order");
const createOrderCoupon = require("./createTable/order_coupon");
const createOrderProduct = require("./createTable/order_product");
const createCart = require("./createTable/cart");
const createCartProduct = require("./createTable/cart_product");
const createCartCoupon = require("./createTable/cart_coupon");

const writeFlag = { flags: "w" };
createOrder(fs.createWriteStream(config.outputs.ORDER_SQL, writeFlag));
createOrderCoupon(fs.createWriteStream(config.outputs.ORDER_COUPON_SQL, writeFlag));
createOrderProduct(fs.createWriteStream(config.outputs.ORDER_PRODUCT_SQL, writeFlag));
createCart(fs.createWriteStream(config.outputs.CART_SQL, writeFlag));
createCartProduct(fs.createWriteStream(config.outputs.CART_PRODUCT_SQL, writeFlag));
createCartCoupon(fs.createWriteStream(config.outputs.CART_COUPON_SQL, writeFlag));

console.log(`Generated SQL to: ${config.outputs.ORDER_SQL}`);
console.log(`Generated SQL to: ${config.outputs.ORDER_COUPON_SQL}`);
console.log(`Generated SQL to: ${config.outputs.ORDER_PRODUCT_SQL}`);
console.log(`Generated SQL to: ${config.outputs.CART_SQL}`);
console.log(`Generated SQL to: ${config.outputs.CART_PRODUCT_SQL}`);
console.log(`Generated SQL to: ${config.outputs.CART_COUPON_SQL}`);
