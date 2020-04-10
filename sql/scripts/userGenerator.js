const fs = require("fs");

const config = require("../../config/sql");

// Functions for creating tables
const createUser = require("./createTable/user");
const createRole = require("./createTable/role");
const createUserRole = require("./createTable/user_role");

// Functions to map objects into SQL for inserting tuples
const insertUser = require("./insertTuple/user");
const insertRole = require("./insertTuple/role");
const insertUserRole = require("./insertTuple/user_role");

// Create write streams
const writeFlag = {flags: "w", encoding: "utf8"};
const userSqlStream = fs.createWriteStream(config.outputs.USER_SQL, writeFlag);
const roleSqlStream = fs.createWriteStream(config.outputs.ROLE_SQL, writeFlag);
const userRoleSqlStream = fs.createWriteStream(config.outputs.USER_ROLE_SQL, writeFlag);

// Create tables
createUser(userSqlStream);
createRole(roleSqlStream);
createUserRole(userRoleSqlStream);

// Insert roles
const roles = require("./dummyData/roles.json");
roles.forEach(role => insertRole(role, roleSqlStream));

// Insert some regular users
for (let i = 0; i < config.NUM_USERS-1; i++) {
    const username = insertUser(userSqlStream);
    insertUserRole(username, roles[0], userRoleSqlStream);
}

// Insert an admin
const username = insertUser(userSqlStream);
insertUserRole(username, roles[1], userRoleSqlStream);

console.log(`Generated SQL to: ${config.outputs.USER_SQL}`);
console.log(`Generated SQL to: ${config.outputs.ROLE_SQL}`);
console.log(`Generated SQL to: ${config.outputs.USER_ROLE_SQL}`);
