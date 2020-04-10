
// update the last_edited attribute for a user
const updateCart = (client,user) => {
    const now = new Date();
    const query = "update cart set last_edited ='"+now+"' where username = '"+user+"';";
    const res = await client.query(query);

    return res;
};

module.exports = updateCart;