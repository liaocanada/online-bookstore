const isInt = require("is-integer");

const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");
const formTextResponse = require("./helpers/formTextResponse");

exports.handler = async (event, context) => {

    if (!isInt(event.pathParameters.product_id)) {
        return formTextResponse(404, "Invalid input");
    }

    const client = await connect();

    // Product ID from path parameters
    const product_id = parseInt(event.pathParameters.product_id);

    // get user info
    const statement = "select distinct product_id,name,description,price,isbn,series,format,pages,string_agg(author_name, ', ') as authors,string_agg(genre, ', ') as genres "+
                    +"from product natural full outer join ((book natural join writes) natural join book_genre) "+
                    +"where product_id = $1 group by product_id,name,description,price,isbn,series,format,pages;";
    const values = [product_id];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(200, res.rows);
};
