const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();
    
    const statement = "select product_id, sum(quantity*order_product.price*1.13) as total, sum(quantity*order_product.price*0.13) as taxes, "+
                        "sum(quantity*publisher_price) as expenditures, name, sum((quantity*order_product.price - quantity*publisher_price) * commission_percent/100) as commission, "+
                        "sum((quantity*order_product.price - quantity*publisher_price) * (1 - commission_percent/100)) as profit "+
                        "from storeorder natural join order_product natural join (product natural full outer join book) natural join publishes "+
                        "group by product_id, name, commission_percent "+
                        "order by profit desc;";

    // Execute the query
    const res = await client.query(statement);

    client.end();

    return formJsonResponse(200, res.rows);
};