const formatToTimestamp = require("./formatToTimestamp");

// Updates the last_edited attribute for a user
const updateCart = async (client, user) => {
    const now = new Date();
    
    const statement = "update cart set last_edited = :now where username = :user;";
    // const values = {now, user};
    // console.log(statement, values);

    // const res = await client.query(statement, values);

    // Can't use lines above because data-api-client does not support Date types
    // Workaround is to use native methods directly, passing the TIMESTAMP typehint
    // Waiting on https://github.com/jeremydaly/data-api-client/issues/28
    let res = await client.executeStatement({
        sql: statement,
        parameters: [
            {
                name: "now",
                value: { stringValue: formatToTimestamp(now, false) },
                typeHint: "TIMESTAMP"
            },
            {
                name: "user",
                value: { stringValue: user }
            }
        ]
    });

    return res;
};

module.exports = updateCart;
