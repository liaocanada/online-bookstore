const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = event.pathParameters.username;
    const prod_id = parseInt(event.pathParameters.product_id);

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // delete a user's product
    const statement = "delete from cart_product where username = $1 and product_id = $2;";
    const values = [user, prod_id];

    const res = await client.query(statement, values);

    client.end();

    return form200Response(res.rows);
};
