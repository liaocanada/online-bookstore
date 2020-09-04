const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");
const formTextResponse = require("./helpers/formTextResponse");
const validateRequestBody = require("./helpers/validateRequestBody");

exports.handler = async (event, context) => {
    const client = await connect();

    // Process and validate request
    const requestBody = JSON.parse(event.body);
    const expectedKeys = ["username, first_name, last_name, email, address, picture"];
    
    if (!validateRequestBody(requestBody, expectedKeys)) {
        return formTextResponse(400, 
            "Missing request body attributes: one of " + expectedKeys.toString());
    }

    const { username, first_name, last_name, email, address, picture } = requestBody;
    
    // Execute SQL query to update user profile info
    const statement = "update storeuser " +
        "set first_name=:first_name, last_name=:last_name, email=:email, address=:address, picture=:picture " +
        "where username=:username;";

    const values = { username, first_name, last_name, email, address, picture };

    const res = await client.query(statement, values);

    // Response 201
    return formJsonResponse(201, { username });
};
