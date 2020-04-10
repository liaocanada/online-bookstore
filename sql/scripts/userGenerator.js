const fs = require("fs");

const config = require("../../config/sql");

// Functions for creating tables
const createUser = require("./createTable/user");

// Functions to map objects into SQL for inserting tuples
const insertUser = require("./insertTuple/user");

// Create write streams
const writeFlag = { flags: "w" };
const userSqlStream = fs.createWriteStream(config.outputs.USER_SQL, writeFlag);

createUser(userSqlStream);

for (let i = 0; i < config.NUM_USERS; i++) {
    const username = insertUser(userSqlStream);
    // TODO create roles and user-role
}

console.log(`Generated SQL to: ${config.outputs.USER_SQL}`);
