module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE user_role(" +
            "username VARCHAR(255) REFERENCES storeuser, " + 
            "role_id INT REFERENCES role, " +
            "PRIMARY KEY(username, role_id)" +
        ");\n"
    );
