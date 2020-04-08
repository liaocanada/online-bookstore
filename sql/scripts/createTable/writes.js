module.exports = 
"CREATE TABLE writes(" +
    "product_id INT NOT NULL REFERENCES book, " +  
    "name VARCHAR(80) NOT NULL REFERENCES author, " + 
    "PRIMARY KEY(product_id, name)" +
");";
