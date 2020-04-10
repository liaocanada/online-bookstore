const { Client } = require("pg");

const connect = async () => {
    const client = new Client({
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,  // Should use AWS Credentials Manager but it costs $
    });
    
    await client.connect();

    return client;
}

module.exports = connect;