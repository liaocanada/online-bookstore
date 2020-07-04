const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");
const formTextResponse = require("./helpers/formTextResponse");
const validateRequestBody = require("./helpers/validateRequestBody");
const updateCart = require("./helpers/updateCart");

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
    updateCart(client, username);

    // check if user has product in cart already
    const statement = "select quantity from cart_product where username=:username and product_id=:pid;";
    const values = { username, pid: parseInt(product_id) };
    console.log(statement, values);

    const res = await client.query(statement, values);

    if (res.records.length == 0) {
        // add product to cart_product
        const statement = "insert into cart_product (username, product_id, quantity) values (:username, :pid, :qty);";
        const values = { username, pid: parseInt(product_id), qty: parseInt(quantity) };
        console.log(statement, values);
        await client.query(statement, values);
    } else {
        // increment quantity if product exists in cart
        const statement = "update cart_product set quantity = :qty where username = :username and product_id = :prod_id;";
        const values = { qty: parseInt(res.records[0].quantity)+parseInt(quantity), username, prod_id };
        console.log(statement, values);
        await client.query(statement, values);
    }

    return formJsonResponse(201, { username:username, product_id:product_id, quantity:quantity });
};
