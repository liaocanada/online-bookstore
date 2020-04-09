const fs = require("fs");
const path = require("path");

const config = require("../../config/sql");

// Generate a coupon
const newCoupon1 = {
    coupon_code: "2019SAVINGS",
    is_percent: false,
    savings: 5,
    valid_from: '2019-01-01 00:00:00',
    valid_to: '2020-01-01 00:00:00'
};
console.log("Generated an expired coupon for $5 off the total order.");
const newCoupon2 = {
    coupon_code: "ORDER15OFF",
    is_percent: true,
    savings: 15,
    valid_from: '2020-04-01 00:00:00',
    valid_to: '2020-04-30 00:00:00'
};
console.log("Generated a coupon for 15% off the total order.");

const coupons = [newCoupon1, newCoupon2];

// Store warehouses in JSON file to be referenced by other scripts
const couponsPath = path.join(__dirname, "./dummyData/coupons.json");
const data = JSON.stringify(coupons, null, 4);
fs.writeFile(couponsPath, data, {flags: "w"}, () => {
    console.log("Stored coupons in /sql/scripts/dummyData/coupons.json");

    // Generate SQL
    const createCoupon = require("./createTable/coupon");
    const insertCoupon = require("./insertTuple/coupon");

    const couponSqlStream = fs.createWriteStream(config.outputs.COUPON_SQL, {flags: "w"});

    createCoupon(couponSqlStream);

    coupons.forEach(coupon => {
        insertCoupon(coupon, couponSqlStream);
    });
    console.log(`Generated SQL to: ${config.outputs.COUPON_SQL}`);

    couponSqlStream.close();
});
