module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE cart(" +
            "username VARCHAR(255) PRIMARY KEY REFERENCES storeuser, " + 
            "last_edited TIMESTAMP" +
        ");\n"
    );
