const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const requestBody = JSON.parse(event.body);
    const expectedKeys = ["quantity"];
    
    if (!validateRequestBody(requestBody, expectedKeys)) {
        return formTextResponse(400, 
            "Missing request body attributes: one of " + expectedKeys.toString());
    }

    const { quantity } = requestBody;

    const username = event.pathParameters.username;
    const prod_id = parseInt(event.pathParameters.product_id);

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    if (parseInt(quantity) <= 0 ) {
        const statement = "delete from cart_product where username = $1 and product_id = $2;";
        const values = [username, prod_id];
        const res = await client.query(statement, values);
    } else {
        // edit quantity of user product
        const statement = "update cart_product set quantity = $1 where username = $2 and product_id = $3;";
        const values = [quantity, username, prod_id];
        const res = await client.query(statement, values);
    }

    client.end();

    return formJsonResponse(201, {product_id: prod_id});
};
