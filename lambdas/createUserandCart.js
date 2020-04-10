const connect = require("./helpers/connectToDatabase");
const form201Response = require("./helpers/form200Response");

exports.handler = async (event, context) => {
    const client = await connect();

    const user = "testUser";
    const pass = "12345";
    const first_name = "John";
    const last_name = "Doe";
    const email = "JohnDoe@gmail.com";
    const address = "198 Cool Street, L1R5D6, ON, Canada";
    const pic = "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg";
    const time_created = new Date();
    const time_last_login = new Date();

    // add user
    let statement = "insert into user (username, password, first_name, last_name, email, address, picture, time_created, time_last_login) values ($1, $2, $3, $4, $5, $6, $7, $8, $9);";
    let values = [user, pass, first_name, last_name, email, address, pic, time_created, time_last_login];
    let res = await client.query(statement, values);

    // create user cart
    statement = "insert into cart (username, last_edited) values ($1, $2);";
    values = [user, time_created];
    res = await client.query(statement, values);

    client.end();

    return form201Response({username: user});
};
