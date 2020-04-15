const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();
    
    const statement = "select product_id, name, sum(quantity) as sales "+
                        "from storeorder natural join order_product natural join (product natural full outer join book) "+
                        "group by product_id, name "+
                        "order by sales desc;";

    // Execute the query
    const res = await client.query(statement);

    client.end();

    return formJsonResponse(200, res.rows);
};