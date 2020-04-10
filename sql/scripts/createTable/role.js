module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE role(" +
            "role_id SERIAL PRIMARY KEY, " + 
            "name VARCHAR(25), " + 
            "description VARCHAR(2047)" + 
        ");\n"
    );
