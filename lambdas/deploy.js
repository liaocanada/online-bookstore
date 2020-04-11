// Deploys the lambda function
// Usage:
// node deploy.js getAllProducts

const path = require("path");
var fs = require("fs");
const archiver = require("archiver");

if (process.argv[2]) {
    console.log("Usage: node deploy.js getAllProducts");
    return;
}

const zipPath = path.join(__dirname, "temp123121231.zip");  // Arbitrary, to be deleted
zip("", zipPath);


function zip(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 }});
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive.file(source, {name: source}).pipe(stream);
    stream.on("close", () => resolve());
    archive.finalize();
  });
};
