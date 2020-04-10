const escape = require("pg-escape");

function addRole(role, outputStream) {

    const sqlFormat = 
        "INSERT INTO role" + 
            "(role_id, name, description) " + 
        "VALUES " +
            `(${role.id}, %L, %L);`;

    // Use pg-escape to escape strings
    const roleSql = escape(sqlFormat, role.name, role.description);

    outputStream.write(roleSql + "\n");
};

module.exports = addRole;