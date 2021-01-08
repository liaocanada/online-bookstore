const connect = require("./helpers/connectToDatabase");
const formJsonResponse = require("./helpers/formJsonResponse");

exports.handler = async (event, context) => {
    const client = await connect();

    const order_num = parseInt(event.pathParameters.order_number);

    // get order info
    let statement = "select * from storeorder where order_number = :order_num;";
    let values = { order_num };
    let res = await client.query(statement, values);
    let info = res.records[0];

    // TODO make sure order belongs to authenticated user

    // get order products
    statement = "select distinct product_id,name,description,order_product.price,isbn,series,format,pages,authors,genres,tags,images "+
                    "from order_product left outer join (product natural full outer join book) using (product_id) natural join ( "+
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
                        ") as pic_table where order_number = :order_num;";

    values = { order_num };
    res = await client.query(statement, values);
    let products = res.records;

    return formJsonResponse(200, { order_number: order_num, products: products, order_info: info });
};
