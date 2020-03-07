// Runs one of the lambdas contained in this folder locally.
// (normally they are supposed to be run on AWS Lambda)
if (process.argv[2])
    require(`./${process.argv[2]}`).handler().then(result => console.log(result));
else
    require("./index.js").handler().then(result => console.log(result));
