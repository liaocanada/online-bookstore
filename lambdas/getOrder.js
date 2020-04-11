const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const order_num = parseInt(event.pathParameters.order_number);

    // get order info
    const statement = "select * from storeorder natural join (order_coupon natural join order_product) where order_number = $1;";
    const values = [order_num];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(200, res.rows);
};
