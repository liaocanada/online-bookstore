const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = event.pathParameters.username;
    
    // select all products in user's cart
    const statement = "select * from cart natural join (cart_product natural join product) group by username having username = $1;";
    const values = [user];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(200, res.rows);
};
