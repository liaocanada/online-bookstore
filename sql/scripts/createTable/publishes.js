module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE publishes(" +
            "product_id INT PRIMARY KEY, " +  // TODO replace with a SQL trigger
            "publisher_name VARCHAR(80) REFERENCES publisher(name), " + 
            "year_published SMALLINT, " + 
            "reorder_threshold INT, " + 
            "commission_percent NUMERIC(5, 3)" +   // ##.###
        ");\n"
    );
