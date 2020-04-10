const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";
    const prod_id = "1";

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // clear all products for a user
    const query = "delete from cart_product where username = '"+user+"';";
    const res = await client.query(query);

    client.end();

    return form200Response(res.rows);
};
