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

    // check if user has product in cart already
    const statement = "select quantity from cart_product where username=$1 and product_id=$2;";
    const values = [username, parseInt(product_id)];
    const res = await client.query(statement, values);

    if (res.rows.length == 0) {
        // add product to cart_product
        const statement = "insert into cart_product (username, product_id, quantity) values ($1, $2, $3);";
        const values = [username, parseInt(product_id), parseInt(quantity)];
        const res = await client.query(statement, values);
    } else {
        // increment quantity if product exists in cart
        const statement = "update cart_product set quantity = $1 where username = $2 and product_id = $3;";
        const values = [parseInt(res.rows[0].quantity)+parseInt(quantity), username, prod_id];
        const res = await client.query(statement, values);
    }


    

    client.end();

    return formJsonResponse(201, { username:username, product_id:product_id, quantity:quantity });
};
