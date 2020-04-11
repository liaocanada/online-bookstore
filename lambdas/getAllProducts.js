const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();
    
    const filter = {
        name: event.queryStringParameters.name,
        author_name: event.queryStringParameters.author_name,
        isbn: event.queryStringParameters.isbn,
        genre: event.queryStringParameters.genre
    }

    let filters = "";
    let counter = 1;
    let values = [];
    let statement = "select distinct product_id,name,description,price,isbn,series,format,pages,string_agg(author_name, ', ') as authors,string_agg(genre, ', ') as genres from product natural full outer join ((book natural join writes) natural join book_genre)";

    // add query strings to filters
    for (let key in filter) {
        filters += " "+key+"=$"+counter;
        values.push(filter.key);
        counter++;
    }


    if (filters != "") {
        filters = " where " + filters;
    }

    statement += filters+" group by product_id,name,description,price,isbn,series,format,pages;";

    const res = await client.query(statement,values);

    client.end();

    return form200Response(res.rows);

    

    
};
