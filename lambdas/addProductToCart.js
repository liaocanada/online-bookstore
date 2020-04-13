const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");
const validateRequestBody = require("./helpers/validateRequestBody");

exports.handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);
    const expectedKeys = ["product_id", "quantity"];
    
    if (!validateRequestBody(requestBody, expectedKeys)) {
        return formTextResponse(400, 
            "Missing request body attributes: one of " + expectedKeys.toString());
    }

    const { product_id, quantity } = requestBody;

    const username = event.pathParameters.username;

    const client = await connect();

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,username);

    // add product to cart_product
    const statement = "insert into cart_product (username, product_id, quantity) values ($1, $2, $3);";
    const values = [username, product_id, quantity];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(201, { username, product_id, quantity });
};
