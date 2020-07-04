const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();
    
    const statement = "select extract(month from time_placed) as month,  extract(year from time_placed) as year, sum(quantity*order_product.price*1.13+delivery_fee) as total, "+
    "sum(delivery_fee) as delivery_fee, sum(quantity*(order_product.price - ((order_product.price-publisher_price)*(commission_percent/100)) - publisher_price)) as profit, "+
    "sum(quantity*publisher_price) as expenditures, sum(quantity*order_product.price*0.13) as taxes, "+
    "sum(quantity*((order_product.price-publisher_price)*(commission_percent/100))) as commission "+
    "from storeorder natural join order_product natural join (product natural full outer join book) natural join publishes "+
    "group by extract(month from time_placed), extract(year from time_placed), delivery_fee "+
    "order by extract(year from time_placed), extract(month from time_placed) desc;";

    // Execute the query
    const res = await client.query(statement);

    return formJsonResponse(200, res.records);
};
