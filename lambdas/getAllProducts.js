const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    filtered = true;

    if (filtered) {
        filter_by = 'isbn';
        search = "345418263";

        // select all products in user's cart
        const statement = "select distinct product_id,name,description,price,isbn,series,format,pages,string_agg(author_name, ', ') as authors,string_agg(genre, ', ') as genres from product natural full outer join ((book natural join writes) natural join book_genre) where "+filter_by+" = $1 group by product_id,name,description,price,isbn,series,format,pages;";
        const values = [search];

        const res = await client.query(statement, values);

        client.end();

        return form200Response(res.rows);

    } else {

        // select all products in user's cart
        const statement = "select distinct product_id,name,description,price,isbn,series,format,pages,string_agg(author_name, ', ') as authors,string_agg(genre, ', ') as genres from product natural full outer join ((book natural join writes) natural join book_genre) group by product_id,name,description,price,isbn,series,format,pages;";

        const res = await client.query(statement);

        client.end();

        return form200Response(res.rows);

    }

    
};
