const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();
    const requestBody = JSON.parse(event.body);
    const { product_id, quantity } = requestBody;

    const user = event.pathParameters.username;

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // add product to cart_product
    const statement = "insert into cart_product (username, product_id, quantity) values ($1, $2, $3);";
    const values = [user, product_id, quantity];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(201, {product_id: product_id});
};
