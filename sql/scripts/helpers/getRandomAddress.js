const faker = require("faker");

const getRandomAddress = () => {
    return faker.random.boolean() ? 
        faker.address.streetAddress() + ", " + faker.random.arrayElement(["ON", "QC", "BC"]) + " CAN" :
        faker.address.streetAddress() + ", " + faker.address.stateAbbr() + " USA";
};

module.exports = getRandomAddress;