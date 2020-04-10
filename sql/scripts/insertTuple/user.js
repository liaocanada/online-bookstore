const escape = require("pg-escape");
const faker = require("faker");
faker.seed(122);

function addUser(outputStream) {
   
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();

    const username = faker.internet.userName([first_name, last_name]);
    const password = "12345";
    const email = faker.internet.email(first_name,last_name,"gmail.com");
    const address = faker.address.streetAddress("###")+", "+faker.address.city()+", "+faker.address.stateAbbr()+faker.address.zipCode("###-###");
    const picture = faker.image.avatar();
    const time_created = faker.date.past(5);
    const time_last_login = faker.date.between('2015-08-01', '2020-12-31');

    const sqlFormat = 
        "INSERT INTO user" + 
            "(username, password, first_name, last_name, email, address, picture, time_created, time_last_login) " + 
        "VALUES " +
            `(%L, %L, %L, %L, %L, %L, %L, %L, %L);`;

    // Use pg-escape to escape strings
    const userSql = escape(sqlFormat, username, password, first_name, last_name, email, address, picture, time_created, time_last_login);

    outputStream.write(userSql + "\n");
};

module.exports = addUser;