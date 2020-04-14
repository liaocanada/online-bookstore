const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = event.pathParameters.username;
    
    // select all products in user's cart
    const statement = "select * "+
                        "from cart natural join (cart_product natural join (product natural full outer join book)) natural join ( "+
                                    "select product_id,string_agg(genre, ', ') as genres "+
                                    "from product natural full outer join (book natural join book_genre) "+
                                    "group by product_id "+
                                ") as genre_table natural left join ( "+
                                    "select product_id,string_agg(author_name, ', ') as authors "+
                                    "from product natural full outer join (book natural join writes) "+
                                    "group by product_id "+
                                ") as author_table natural left join ( "+
                                    "select product_id,string_agg(image, ', ') as images "+
                                    "from (product natural full outer join book) natural join product_image "+
                                    "group by product_id "+
                                ") as pic_table "+
                        "where username = $1;";
    const values = [user];

    const res = await client.query(statement, values);

    client.end();

    return formJsonResponse(200, res.rows);
};

/*
select *
from cart natural join (cart_product natural join (product natural full outer join book)) natural join (
			select product_id,string_agg(genre, ', ') as genres 
			from product natural full outer join (book natural join book_genre)
			group by product_id
		) as genre_table natural left join (
			select product_id,string_agg(author_name, ', ') as authors
			from product natural full outer join (book natural join writes)
			group by product_id
        ) as author_table natural left join (
			select product_id,string_agg(image, ', ') as images
			from (product natural full outer join book) natural join product_image
			group by product_id
        ) as pic_table
where username = 'davidliao'

select * from cart natural left join (cart_product natural join (product natural full outer join book)) where username = 'davidliao'
*/