const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const author = event.pathParameters.author_name;

    // get author info
    const statement = "select * from author where name = $1;";
    const values = [author];
    const res = await client.query(statement, values);

    const authorInfo = res.rows[0];

    client.end();

    return formJsonResponse(200, {author:authorInfo});
};
