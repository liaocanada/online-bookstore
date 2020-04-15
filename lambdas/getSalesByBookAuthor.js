const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();
    
    const statement = "select sum(quantity) as sales, author_name "+
                        "from storeorder natural join order_product natural join book natural join writes "+
                        "group by author_name "+
                        "order by sales desc;";

    // Execute the query
    const res = await client.query(statement);

    client.end();

    return formJsonResponse(200, res.rows);
};