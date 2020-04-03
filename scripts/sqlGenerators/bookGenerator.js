const papa = require("papaparse");
const request = require("request");

const options = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    preview: 10,
};
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
const dataStream = request
    .get("https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv")
    .pipe(parseStream);

let data = [];
parseStream.on("data", chunk => {
    data.push(chunk);
});

dataStream.on("finish", () => {
    console.log(JSON.stringify(data));
});
