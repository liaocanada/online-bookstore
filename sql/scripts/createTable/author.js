module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE author(" +
            "name VARCHAR(80) PRIMARY KEY, " + 
            "picture VARCHAR(2047), " + 
            "summary VARCHAR(2047)" + 
        ");\n"
    );
