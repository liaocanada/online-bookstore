const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const res = await client.query("SELECT * FROM product;");

    client.end();

    return form200Response(res.rows);

    /*return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(res.rows),
    };*/
};
