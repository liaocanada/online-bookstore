const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";
    const prod_id = "1";
    const quantity = 2;

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // edit quantity of user product
    const query = "update cart_product set quantity ='"+quantity+"' where username = '"+user+"' and product_id = '"+prod_id+"';";

    const res = await client.query(query);

    client.end();

    return form200Response(res.rows);
};
