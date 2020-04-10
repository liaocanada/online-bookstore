const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";
    const prod_id = "1";
    const quantity = 1;

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // add product to cart_product
    // TODO fix risk of SQL injection (remove this comment when fixed)
    const query = "insert into cart_product (username, product_id, quantity) " + "values ('"+user+"', '"+prod_id+"', '"+quantity+"');";

    const res = await client.query(query);

    client.end();

    return form200Response(res.rows);
};
