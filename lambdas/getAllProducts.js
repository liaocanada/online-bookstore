const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();
    
    let statement = "select distinct product_id,name,description,price,isbn,series,format,pages,authors,genres,images "+
    "from (product natural full outer join book) natural join ";

    // Apply filters from query string
    const query = event.queryStringParameters || {};
    const filter = {
        name: query.name,
        author_name: query.author_name,
        isbn: query.isbn,
        genre: query.genre,
        series: query.series,
        format: query.format
    };
    let counter = 1;
    const filters = [];
    const values = [];

    Object.keys(filter).forEach(key => {
        if (filter[key]) {
            filters.push("upper("+key + ") like upper(concat('%',$"+counter+",'%'))");
            values.push(filter[key]);
            counter++;
        }
    });

    // Join the parts into a query
    const filtersString = (filters.length === 0) ? "" : (" where " + filters.join(" or "));

    statement += "( select product_id,string_agg(genre, ', ') as genres "+
    "from product natural full outer join (book natural join book_genre) "+filtersString+" group by product_id "+
    ") as genre_table natural join ";

    statement += "( select product_id,string_agg(author_name, ', ') as authors "+
    "from product natural full outer join (book natural join writes) "+filtersString+" group by product_id "+
    ") as author_table natural join ";

    statement += "( select product_id,string_agg(image, ', ') as images "+
    "from (product natural full outer join book) natural join product_image "+filtersString+" group by product_id "+
    ") as pic_table;";

    

    // Execute the query
    console.log(statement, values);
    const res = await client.query(statement,values);

    client.end();

    return formJsonResponse(200, res.rows);
};

/*
select distinct product_id,name,description,price,isbn,series,
        format,pages,string_agg(author_name, ', ') as authors,string_agg(genre, ', ') as genres
        from product natural full outer join ((book natural join writes) natural join book_genre) 
		where upper(name) like upper(concat('%','harr','%'))
        group by product_id,name,description,price,isbn,series,format,pages
        

select product_id,string_agg(author_name, ', ') as authors
from product natural full outer join (book natural join writes)
where upper(name) like upper(concat('%','harr','%'))
group by product_id

select product_id,string_agg(genre, ', ') as genres
from product natural full outer join (book natural join book_genre)
where upper(name) like upper(concat('%','harr','%'))
group by product_id
		
 */ 