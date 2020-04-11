const connect = require("./helpers/connectToDatabase");
const form201Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const username = "testUser";
    const status = "Ordered";
    const billed_to = "198 Cool Street, L1R5D6, ON, Canada";
    const shipped_to = "198 Cool Street, L1R5D6, ON, Canada";
    const time_placed = new Date();
    const delivery_fee = 3.22;

    // add to order relation
    const statement = "insert into order (order_number, username, status, billed_to, shipped_to, time_placed, delivery_fee) values (DEFAULT, $1, $2, $3, $4, $5, $6);";
    const values = [username, status, billed_to, shipped_to, time_placed, delivery_fee];

    const res = await client.query(statement, values);

    // get all items from user cart and add them to order_product

    // get all coupons from cart_coupon, but add to order_coupon

    // clear user cart (by calling clearCart.js)

    client.end();

    return form201Response({order_number: order_number});
};
