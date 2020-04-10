exports.handler = async (event, context) => {
    const { Client } = require("pg");
    const client = new Client({
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,  // Should use AWS Credentials Manager but it costs $
    });

    const user = "testUser";
    const prod_id = "1";
    const quantity = 1;

    await client.connect();

    // update user's cart last_edited
    const update = require("./helpers/updateCart")(client,user);

    // add product to cart_product
    const query = "insert into cart_product (username, product_id, quantity) " + "values ('"+user+"', '"+prod_id+"', '"+quantity+"');";

    const res = await client.query(query);

    client.end();

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(res.rows),
    };
};
