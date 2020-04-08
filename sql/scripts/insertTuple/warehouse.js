const escape = require("pg-escape");

function mapToWarehouseSql(warehouse, outputStream) {
    // Due to limitations on pg-escape module, numbers are injected directly into the string
    // Numbers don't come from user input
    const sqlFormat = 
        "INSERT INTO warehouse(name, address, phone, area_sqft) " + 
        `VALUES (%L, %L, ${warehouse.phone}, ${warehouse.area_sqft});`;

    // Use pg-escape to escape strings
    const writesSql = escape(sqlFormat, warehouse.name, warehouse.address);

    outputStream.write(writesSql + "\n");
};

module.exports = mapToWarehouseSql;