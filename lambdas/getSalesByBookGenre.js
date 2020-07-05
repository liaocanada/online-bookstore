const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();
    
    const statement = "select sum(quantity) as sales, genre "+
                        "from storeorder natural join order_product natural join book natural join book_genre "+
                        "group by genre "+
                        "order by sales desc;";

    // Execute the query
    const res = await client.query(statement);

    ;

    return formJsonResponse(200, res.records);
};