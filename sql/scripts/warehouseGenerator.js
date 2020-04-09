const fs = require("fs");
const path = require("path");
const faker = require("faker");
faker.seed(123);

const config = require("../../config/sql");

// Generate some warehouses
const warehouses = [];
for (let i = 0; i < config.NUM_WAREHOUSES; i++) {
    const name = faker.company.companyName() + "'s warehouse";
    if (warehouses.find(warehouse => warehouse.name === name)) throw new Error("Should be unique");

    const address = require("./helpers/getRandomAddress")();

    const phone = require("./helpers/getRandomPhone")();

    const area_sqft = faker.random.number({ min: 20000, max: 110000 });

    const newWarehouse = {
        name,
        address,
        phone,
        area_sqft
    };
    warehouses.push(newWarehouse);
}
console.log(`Generated ${config.NUM_WAREHOUSES} warehouses.`);


// Store warehouses in JSON file to be referenced by other scripts
const warehousesPath = path.join(__dirname, "./dummyData/warehouses.json");
const data = JSON.stringify(warehouses, null, 4);
fs.writeFile(warehousesPath, data, {flags: "w"}, () => {
    console.log("Stored warehouses in /sql/scripts/dummyData/warehouses.json");

    // Generate SQL
    const config = require("../../config/sql");

    const createWarehouse = require("./createTable/warehouse");
    const insertWarehouse = require("./insertTuple/warehouse");

    const warehouseSqlStream = fs.createWriteStream(config.outputs.WAREHOUSE_SQL, {flags: "w"});

    createWarehouse(warehouseSqlStream);

    warehouses.forEach(warehouse => {
        insertWarehouse(warehouse, warehouseSqlStream);
    });
    console.log(`Generated SQL to: ${config.outputs.WAREHOUSE_SQL}`);

    warehouseSqlStream.close();
});
