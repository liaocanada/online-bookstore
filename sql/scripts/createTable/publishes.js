module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE publishes(" +
            "product_id INT PRIMARY KEY, " +  // Foreign key removed since it needs to be applied on both product and book
            "publisher_name VARCHAR(80) REFERENCES publisher(name), " + 
            "year_published SMALLINT, " + 
            "reorder_threshold INT, " + 
            "commission_percent NUMERIC(5, 3)" +   // ##.###
        ");\n"
    );
