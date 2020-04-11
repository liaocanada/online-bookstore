const connect = require("./helpers/connectToDatabase");
const form200Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    filtered = true;

    if (filtered) {
        filter_by = 'isbn';
        search = "345418263";

        // select all products in user's cart
        const statement = "select * from product natural full outer join ((book natural join writes) natural join book_genre) where "+filter_by+" = $1;";
        const values = [search];

        const res = await client.query(statement, values);

        client.end();

        return form200Response(res.rows);

    } else {

        // select all products in user's cart
        const statement = "select * from product natural full outer join ((book natural join writes) natural join book_genre);";

        const res = await client.query(statement);

        client.end();

        return form200Response(res.rows);

    }

    
};
