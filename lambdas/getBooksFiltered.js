const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    filter_by = 'isbn';
    search = "345418263";

    // select all products in user's cart
    const statement = "select * from ((book join writes on book.product_id=writes.product_id) join book_genre on book.product_id=writes.product_id) where "+filter_by+" = $1;";
    const values = [search];

    const res = await client.query(statement, values);

    client.end();

    return form200Response(res.rows);
};
