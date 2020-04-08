module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE warehouse(" +
            "name VARCHAR(80) PRIMARY KEY, " +  
            "address VARCHAR(255) NOT NULL, " + 
            "phone INT, " + 
            "area_sqft INT, " + 
        ");\n"
    );
