const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // clear all products for a user
    const statement = "delete from cart_product where username = '$1';";
    const values = [user];
    const res = await client.query(statement, values);

    client.end();

    return form200Response(res.rows);
};
