module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE user(" +
            "username VARCHAR(255) PRIMARY KEY, " + 
            "password VARCHAR(255), " + 
            "first_name VARCHAR(255), " + 
            "last_name VARCHAR(255), " + 
            "email VARCHAR(255), " + 
            "address VARCHAR(255), " + 
            "picture VARCHAR(255), " + 
            "time_created TIMESTAMP, " + 
            "time_last_login TIMESTAMP, " + 
        ");\n"
    );
