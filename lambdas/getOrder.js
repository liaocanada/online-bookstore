const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const order_num = 100;

    // get order info
    const statement = "select * from order natural join (order_coupon natural join order_product) where order_number = $1;";
    const values = [order_num];

    const res = await client.query(statement, values);

    client.end();

    return form200Response(res.rows);
};
