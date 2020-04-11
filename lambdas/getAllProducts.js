const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();
    
    let statement = "select distinct product_id,name,description,price,isbn,series," + 
        "format,pages,string_agg(author_name, ', ') as authors,string_agg(genre, ', ') as genres " + 
        "from product natural full outer join ((book natural join writes) natural join book_genre) ";

    // Apply filters from query string
    const filter = {
        name: event.queryStringParameters.name,
        author_name: event.queryStringParameters.author_name,
        isbn: event.queryStringParameters.isbn,
        genre: event.queryStringParameters.genre,
        series: event.queryStringParameters.series,
        format: event.queryStringParameters.format
    };
    let counter = 1;
    const filters = [];
    const values = [];

    Object.keys(filter).forEach(key => {
        if (filter[key]) {
            filters.push(key + "=$" + counter);
            values.push(filter[key]);
            counter++;
        }
    });

    // Join the parts into a query
    const filtersString = (filters.length === 0) ? "" : (" where " + filters.join(" and "));

    statement += 
        filtersString +
        " group by product_id,name,description,price,isbn,series,format,pages;";

    // Execute the query
    console.log(statement, values);
    const res = await client.query(statement,values);

    client.end();

    return form200Response(res.rows);
};
