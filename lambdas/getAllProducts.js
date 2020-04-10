const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    // select all products in user's cart
    const statement = "select * from product natural full outer join book;";

    const res = await client.query(statement);

    client.end();

    return form200Response(res.rows);
};
