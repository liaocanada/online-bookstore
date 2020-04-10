const escape = require("pg-escape");

function addUserRole(username, role, outputStream) {

    const sqlFormat = 
        "INSERT INTO user_role" + 
            "(username, role_id) " + 
        "VALUES " +
            `(%L, ${role.id});`;

    // Use pg-escape to escape strings
    const userRoleSql = escape(sqlFormat, username);

    outputStream.write(userRoleSql + "\n");
};

module.exports = addUserRole;