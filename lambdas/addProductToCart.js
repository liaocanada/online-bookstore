const connect = require("./helpers/connectToDatabase");
const form201Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";
    const prod_id = 1;
    const quantity = 1;

    // update user's cart last_edited
    //const update = require("./helpers/updateCart")(client,user);

    // add product to cart_product
    const statement = "insert into cart_product (username, product_id, quantity) values ($1, $2, $3);";
    const values = [user, prod_id, quantity];

    const res = await client.query(statement, values);

    client.end();

    return form201Response({product_id: prod_id});
};
