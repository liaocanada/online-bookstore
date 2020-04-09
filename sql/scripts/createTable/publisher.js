module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE publisher(" +
            "name VARCHAR(80) PRIMARY KEY, " + 
            "address VARCHAR(2047), " + 
            "email VARCHAR(255), " + 
            "phone BIGINT, " +                 // up to 15 digits
            "institution_number SMALLINT, " +  // 3 digit
            "branch_number INT, " +            // 5 digit
            "account_number BIGINT" +        // up to 12 digits
        ");\n"
    );
