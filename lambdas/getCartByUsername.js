const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";

    // select all products in user's cart
    const query = "select * " + "from cart natural join cart_product " + "group by username " + "having username = '" + username + "';";

    const res = await client.query(query);

    client.end();

    return form200Response(res.rows);
};
