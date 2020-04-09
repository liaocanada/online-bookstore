module.exports = outputStream =>
    outputStream.write(
        "CREATE TABLE product(" +
            "product_id SERIAL PRIMARY KEY, " +
            "name VARCHAR(255), " + 
            "description VARCHAR(2047), " + 
            "price NUMERIC(14, 2), " + 
            "publisher_price NUMERIC(8, 2), " + 
            "sold_count INT" + 
        ");\n"
    );
