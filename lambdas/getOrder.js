const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const order_num = parseInt(event.pathParameters.order_number);

    // get order info
    let statement = "select * from storeorder where order_number = $1;";
    let values = [order_num];
    let res = await client.query(statement, values);
    let info = res.rows[0];

    // get order products
    statement = "select * from order_product where order_number = $1;";
    values = [order_num];
    res = await client.query(statement, values);
    let products = res.rows;

    client.end();

    return formJsonResponse(200, {order_number:order_num, products:products, order_info:info });
};
