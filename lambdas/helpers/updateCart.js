// Updates the last_edited attribute for a user
const updateCart = async (client, user) => {
    const now = new Date();
    
    const statement = "update cart set last_edited = :now where username = :user;";
    const values = {now, user};
    console.log(statement, values);

    const res = await client.query(statement, values);

    return res;
};

module.exports = updateCart;
