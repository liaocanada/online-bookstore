const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");
const updateCart = require("./helpers/updateCart");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = event.pathParameters.username;

    // update user's cart last_edited
    updateCart(client,user);

    // clear all products for a user
    const statement = "delete from cart_product where username = :user;";
    const values = { user };
    const res = await client.query(statement, values);

    return formJsonResponse(200, res.rows);
};
