module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE role(" +
            "username VARCHAR(255) REFERENCES user, " + 
            "role_id INT REFERENCES role", +
            "PRIMARY KEY(username, role_id)" +
        ");\n"
    );
