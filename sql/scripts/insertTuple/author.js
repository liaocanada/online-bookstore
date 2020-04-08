const escape = require("pg-escape");
const faker = require("faker");
faker.seed(123);

function mapToSqlAuthor(author) {
    const name = author;
    const picture = getPicture(author);  // Just the url
    const summary = getSummary(author);

    const sqlFormat = 
        "INSERT INTO author" + 
            "(name, picture, summary) " + 
        "VALUES " +
            `(%L, %L, %L);`;

    // Use pg-escape to escape strings
    const bookSql = escape(sqlFormat, name, picture, summary);

    return bookSql;
};

function getPicture(author) {
    return faker.image.avatar();
}

function getSummary(author) {
    const birthday = faker.date.between("1940-01-01", "1995-01-01").toLocaleDateString();
    const numKids = faker.random.number({ min: 2, max: 6 });
    const pet = faker.random.arrayElement(
        ["dog", "cat", "rock", "chimpanzee", "unicorn", "giraffe", "python", "psychrolutes marcidus"]
    );

    const summary = `${author}, ${faker.name.suffix()} (born ${birthday}) ` +
        `is a ${faker.company.catchPhraseAdjective()} writer from ${faker.address.country()}. ` +
        `Growing up, their father ${faker.name.firstName(0)} always told them, ` + 
        `"${faker.hacker.phrase()}", and they always took this to heart when writing ` + 
        `their books. Now, ${author} lives with their spouse, ${numKids} children, ` + 
        `and pet ${pet}, while being a ${faker.name.jobTitle()} on the side to pay the bills.`
    
    return summary;
}

module.exports = mapToSqlAuthor;