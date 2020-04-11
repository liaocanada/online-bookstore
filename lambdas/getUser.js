const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = event.pathParameters.username;

    // get user info
    const statement = "select * from storeuser natural join order where username = $1;";
    const values = [user];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(200, res.rows);
};
