const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = event.pathParameters.username;

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // clear all products for a user
    const statement = "delete from cart_product where username = $1;";
    const values = [user];
    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(200, res.rows);
};
