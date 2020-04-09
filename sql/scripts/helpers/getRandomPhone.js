const faker = require("faker");

const getRandomPhone = () => {
    return parseInt(faker.phone.phoneNumberFormat().split("-").join(""));
};

module.exports = getRandomPhone;