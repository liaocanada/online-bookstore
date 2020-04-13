const isInt = require("is-integer");

const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");
const formTextResponse = require("./helpers/formTextResponse");

exports.handler = async (event, context) => {

    // Verify product ID from path parameters
    const product_id = parseInt(event.pathParameters.product_id);
    if (!isInt(product_id)) {
        return formTextResponse(404, product_id + " is not a valid product ID.");
    }

    const client = await connect();


    // get user info
    const statement = "select product_id,name,description,price,isbn,series,format,pages,authors,genres,images,tags,stock "+
                        "from (product natural full outer join book) natural join stored_in natural join "+
                                "(select product_id,string_agg(genre, ', ') as genres "+
                                    "from product natural full outer join (book natural join book_genre) "+
                                    "where product_id = $1 "+
                                    "group by product_id "+
                                ") as genre_table natural left join ( "+
                                    "select product_id,string_agg(author_name, ', ') as authors "+
                                    "from product natural full outer join (book natural join writes) "+
                                    "where product_id = $1 "+
                                    "group by product_id "+
                                ") as author_table natural left join ( "+
                                    "select product_id,string_agg(tag, ', ') as tags "+
                                    "from (product natural full outer join book) natural join product_tag "+
                                    "where product_id = $1 "+
                                    "group by product_id "+
                                ") as tag_table natural left join ( "+
                                    "select product_id,string_agg(image, ', ') as images "+
                                    "from (product natural full outer join book) natural join product_image "+
                                    "where product_id = $1 "+
                                    "group by product_id "+
                                ") as pic_table;";
    const values = [product_id];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(200, res.rows[0]);
};

/*
select product_id,name,description,price,isbn,series,format,pages,authors,genres,images,tags,stock
from (product natural full outer join book) natural join stored_in natural join
		(
			select product_id,string_agg(genre, ', ') as genres 
			from product natural full outer join (book natural join book_genre)
			where product_id = $1
			group by product_id
		) as genre_table natural left join (
			select product_id,string_agg(author_name, ', ') as authors
			from product natural full outer join (book natural join writes)
			where product_id = $1
			group by product_id
        ) as author_table natural left join ( 
            select product_id,string_agg(tag, ', ') as tags
            from (product natural full outer join book) natural join product_tag
            where product_id = $1
            group by product_id
        ) as tag_table natural left join (
			select product_id,string_agg(image, ', ') as images
			from (product natural full outer join book) natural join product_image
			where product_id = $1
			group by product_id
        ) as pic_table
         */