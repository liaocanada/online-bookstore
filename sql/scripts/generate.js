const childProcess = require("child_process");

const runOrder = [
    "couponGenerator.js",
    "warehouseGenerator.js",
    "bookGenerator.js",
    "productGenerator.js"
];
let currentIndex = 0;

// Some recursion :)
const runNextGenerator = () => {
    if (currentIndex === runOrder.length) {
        console.log("Done!");
        return;
    }

    console.log(" > node", runOrder[currentIndex]);
    const childProcessInstance = childProcess.fork(runOrder[currentIndex++]);

    // childProcessInstance.stdout.pipe(process.stdout);
    childProcessInstance.on("exit", () => {
        console.log("\n");
        runNextGenerator();
    });
};

// Run
runNextGenerator();
