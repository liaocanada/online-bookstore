const childProcess = require("child_process");

// Scripts should be run in this order
const runOrder = [
    "couponGenerator.js",
    "warehouseGenerator.js",
    "bookGenerator.js",
    "productGenerator.js",
    "userGenerator.js",
    "otherGenerator.js"
];

// Some recursion :)
const runGenerators = fromIndex => {
    if (fromIndex === runOrder.length) {
        console.log("Done!");
        return;
    }

    // Run the script at the given index
    console.log(" > node", runOrder[fromIndex]);
    const childProcessInstance = childProcess.fork(runOrder[fromIndex]);

    // When done, run the next script
    childProcessInstance.on("exit", () => {
        console.log("\n");
        runGenerators(fromIndex + 1);
    });
};

// Run
runGenerators(0);
