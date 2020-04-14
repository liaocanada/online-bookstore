const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = event.pathParameters.username;

    // get user info
    let statement = "select * from storeuser where username = $1;";
    let values = [user];
    let res = await client.query(statement, values);

    const userInfo =  res.rows[0];

    // get user orders
    statement = "select order_number, status, time_placed from storeorder where username = $1;";
    values = [user];
    res = await client.query(statement, values);
    const orders = res.rows; // ex. [ {order_number: 1, etc.},{order_number: 5, etc.} ]

    client.end();

    return formJsonResponse(200, {user: userInfo, orders:orders});
};
