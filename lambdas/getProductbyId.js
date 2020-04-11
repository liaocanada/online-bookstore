const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const product_id = 1;

    // get user info
    const statement = "select distinct product_id,name,description,price,isbn,series,format,pages,string_agg(author_name, ', ') as authors,string_agg(genre, ', ') as genres from product natural full outer join ((book natural join writes) natural join book_genre) where product_id = $1 group by product_id,name,description,price,isbn,series,format,pages;";
    const values = [product_id];

    const res = await client.query(statement, values);

    client.end();

    return form200Response(res.rows);
};
