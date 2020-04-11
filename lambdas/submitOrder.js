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
    let statement = "insert into storeorder (order_number, username, status, billed_to, shipped_to, time_placed, delivery_fee) values (DEFAULT, $1, $2, $3, $4, $5, $6) returning order_number;";
    let values = [username, status, billed_to, shipped_to, time_placed, delivery_fee];

    let res = await client.query(statement, values);

    const order_number = res.rows[0].order_number;

    // get all items from user cart cart_product and add them to order_product
    // get items from cart first
    statement = "select product_id, quantity, price from cart_product natural join product where username=$1";
    values = [username];
    res = await client.query(statement, values);
    // add all to order_product
    for (let i=0; i<res.rows.length; i++) {
        statement = "insert into order_product (order_number, product_id, quantity, price) values ($1, $2, $3, $4)";
        values = [order_number, res.rows[i].product_id, res.rows[i].quantity, res.rows[i].price];
        res = await client.query(statement, values);
    }

    // get all coupons from cart_coupon, but add to order_coupon
    statement = "select coupon_code from cart_coupon where username=$1";
    values = [username];
    res = await client.query(statement, values);
    // add all to order_product
    for (let i=0; i<res.rows.length; i++) {
        statement = "insert into order_coupon (order_number, coupon_code) values ($1, $2)";
        values = [order_number, res.rows[i].coupon_code];
        res = await client.query(statement, values);
    }

    // clear user cart
    statement = "delete from cart_product where username = $1;";
    values = [username];
    res = await client.query(statement, values);

    client.end();

    return form201Response({order_number: order_number});
};
