const connect = require("./helpers/connectToDatabase");
const formTextResponse = require("./helpers/formTextResponse");
const formJsonResponse = require("./helpers/formJsonResponse");
const validateRequestBody = require("./helpers/validateRequestBody");

exports.handler = async (event, context) => {
    // TODO validate data types of each
    const requestBody = JSON.parse(event.body);
    const expectedKeys = ["username", "password", "first_name", "last_name",
        "email", "address", "picture"];
    
    if (!validateRequestBody(requestBody, expectedKeys)) {
        return formTextResponse(400, 
            "Missing request body attributes: one of " + expectedKeys.toString());
    }

    const { username, password, first_name, last_name,
        email, address, picture } = requestBody;
    const time_created = new Date();
    const time_last_login = new Date();

    const client = await connect();

    // add user
    // TODO add error handling for duplicate usernames
    let statement = "insert into storeuser (username, password, first_name, " + 
        "last_name, email, address, picture, time_created, time_last_login) " + 
        "values ($1, $2, $3, $4, $5, $6, $7, $8, $9);";
    let values = [username, password, first_name, last_name, email, address, 
        picture, time_created, time_last_login];
    let res = await client.query(statement, values);

    // create user cart
    statement = "insert into cart (username, last_edited) values ($1, $2);";
    values = [username, time_created];
    res = await client.query(statement, values);

    // give user the role of customer
    statement = "insert into user_role (username, role_id) values ($1, $2);";
    values = [username, 1]; // 1 is role id for customer
    res = await client.query(statement, values);

    client.end();

    return formJsonResponse({ username });
};
