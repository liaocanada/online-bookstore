module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE cart(" +
            "username VARCHAR(255) PRIMARY KEY, " +  // References user
            "last_edited TIMESTAMP" +
        ");\n"
    );
