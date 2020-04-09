const escape = require("pg-escape");
const faker = require("faker");
faker.seed(123);

function addPublisher(publisher, outputStream) {
    const name = publisher;
    const address = require("../helpers/getRandomAddress")();
    const email = faker.internet.email(publisher);
    const phone = require("../helpers/getRandomPhone")();
    const institution_number = faker.random.number({ min: 1, max: 10 });
    const branch_number = faker.random.number({ min: 1, max: 99999 });
    const account_number = faker.random.number({ min: 10000000, max: 999999999999 });

    const sqlFormat = 
        "INSERT INTO publisher" + 
            "(name, address, email, phone, institution_number, branch_number, account_number) " + 
        "VALUES " +
            `(%L, %L, %L, ${phone}, ${institution_number}, ${branch_number}, ${account_number});`;

    // Use pg-escape to escape strings
    const publisherSql = escape(sqlFormat, name, address, email);

    outputStream.write(publisherSql + "\n");
};

module.exports = addPublisher;