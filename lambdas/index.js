exports.handler = async (event, context) => {
    const { Client } = require("pg");
    const client = new Client({
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,  // Should use AWS Credentials Manager but it costs $
    });

    await client.connect();

    const res = await client.query("SELECT * FROM product;");

    client.end();

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(res.rows),
    };
};
