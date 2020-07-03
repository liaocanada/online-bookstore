const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

const fs = require('fs');

exports.handler = async (event, context) => {
    const client = await connect();
    
    let statement = "select distinct product_id,name,description,price,isbn,series,format,pages,authors,genres,tags,images "+
                    "from (product natural full outer join book) natural join ( "+
                            "select product_id,string_agg(genre, ', ') as genres "+
                            "from product natural full outer join (book natural join book_genre) "+
                            "group by product_id "+
                        ") as genre_table natural left join ( "+
                            "select product_id,string_agg(author_name, ', ') as authors "+
                            "from product natural full outer join (book natural join writes) "+
                            "group by product_id "+
                        ") as author_table natural left join ( "+
                            "select product_id,string_agg(tag, ', ') as tags "+
                            "from (product natural full outer join book) natural join product_tag "+
                            "group by product_id "+
                        ") as tag_table natural left join ( "+
                            "select product_id,string_agg(image, ', ') as images "+
                            "from (product natural full outer join book) natural join product_image "+
                            "group by product_id "+
                        ") as pic_table";

    // Apply filters from query string
    const query = event.queryStringParameters || {};
    const filter = {
        name: query.name,
        authors: query.author_name,
        isbn: query.isbn,
        genres: query.genre,
        series: query.series,
        format: query.format,
        tags: query.tag
    };
    // let counter = 1;
    const filters = [];
    const values = {};

    Object.keys(filter).forEach(key => {
        if (filter[key]) {
            // e.g. upper(title) like concat('%', :title, '%') -->
            // upper(title) like concat('%', 'harry potter', '%') -->
            // TITLE like '%HARRY POTTER%' 
            filters.push(`upper(${key}) like concat('%', upper(:${key}), '%')`);
            values[key] = filter[key];
        }
    });

    // Join the parts into a query
    const filtersString = (filters.length === 0) ? "" : (" where " + filters.join(" or "));
    statement += filtersString+";";

    // Execute the query
    console.log(statement, values);
    const res = await client.query(statement, values);

    return formJsonResponse(200, res.records);
};
