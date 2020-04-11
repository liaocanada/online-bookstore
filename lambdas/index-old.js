const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const res = await client.query("SELECT * FROM product;");

    client.end();

    return formJsonResponse(200, res.rows);
};
