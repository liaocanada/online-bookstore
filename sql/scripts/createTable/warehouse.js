module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE warehouse(" +
            "name VARCHAR(80) PRIMARY KEY, " +  
            "address VARCHAR(255) NOT NULL, " + 
            "phone BIGINT, " +      // up to 15 digits
            "area_sqft INT" + 
        ");\n"
    );
