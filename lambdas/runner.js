// Runs one of the lambdas contained in this folder locally.
// (normally they are supposed to be run on AWS Lambda)

// Usage:
// node runner.js getAllProducts -p ./testEvents/sampleRequest.json
const path = require("path");

const dashPFlagIndex = process.argv.indexOf("-p");
const parameterFile = (dashPFlagIndex === -1) ? undefined : process.argv[dashPFlagIndex + 1];
const args = parameterFile ? require(path.join(__dirname, parameterFile)) : undefined;

if (process.argv[2])
    require(`./${process.argv[2]}`).handler(args).then(result => console.log(result));
else
    require("./index.js").handler(args).then(result => console.log(result));
