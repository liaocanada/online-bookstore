const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";

    // get user info
    const statement = "select * from user natural join order where username = $1;";
    const values = [user];

    const res = await client.query(statement, values);

    client.end();

    return form200Response(res.rows);
};
