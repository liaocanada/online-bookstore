const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";
    const prod_id = 1;
    const quantity = 2;

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // edit quantity of user product
    const statement = "update cart_product set quantity = $1 where username = $2 and product_id = $3;";
    const values = [quantity, user, prod_id];

    const res = await client.query(statement, values);

    client.end();

    return form201Response({product_id: prod_id});
};
