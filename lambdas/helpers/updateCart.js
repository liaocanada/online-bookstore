
// update the last_edited attribute for a user
const updateCart = async (client, user) => {
    const now = new Date();
    const statement = "update cart set last_edited = $1 where username = $2;";
    const values = [now, user];

    const res = await client.query(statement, values);

    return res;
};

module.exports = updateCart;
