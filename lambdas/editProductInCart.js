const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");
const formTextResponse = require("./helpers/formTextResponse");
const validateRequestBody = require("./helpers/validateRequestBody");
const updateCart = require("./helpers/updateCart");

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
    updateCart(client,username);

    if (parseInt(quantity) <= 0 ) {
        const statement = "delete from cart_product where username = :username and product_id = :prod_id;";
        const values = { username, prod_id };
        await client.query(statement, values);
    } else {
        // edit quantity of user product
        const statement = "update cart_product set quantity = :quantity where username = :username and product_id = :prod_id;";
        const values = { quantity, username, prod_id };
        await client.query(statement, values);
    }

    return formJsonResponse(201, {product_id: prod_id});
};
