module.exports = 
"CREATE TABLE author(" +
    "author_id SERIAL PRIMARY KEY, " + 
    "first_name VARCHAR(80), " + 
    "last_name VARCHAR(80), " + 
    "picture BLOB, " + 
    "summary VARCHAR(2047)" + 
");";
