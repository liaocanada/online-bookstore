const papa = require("papaparse");
const request = require("request");
const config = require("../../../../config/sql");

const bookToTags = {};
let loadingPromise = null;

const parseOptions = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
};

async function loadTagMap() {
    // If loading return that Promise
    if (loadingPromise) return loadingPromise;

    // If already loaded return loaded object
    if (Object.keys(bookToTags).length) {
        return bookToTags;
    }

    // Start loading
    console.log("Loading tags...");
    loadingPromise = loadTagIdToTagName();
    return loadingPromise;
}

async function loadTagIdToTagName() {
    return new Promise((resolve, reject) => {
        const tagsStream = request.get("https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/tags.csv");
        const parsedTagsStream = papa.parse(papa.NODE_STREAM_INPUT, parseOptions);
        tagsStream.pipe(parsedTagsStream);

        // Add tag id to tag name mappings
        const tagIdToTagName = {};
        parsedTagsStream.on("data", row => {
            tagIdToTagName[row.tag_id] = row.tag_name
        });

        parsedTagsStream.on("finish", async () => {
            await loadBooksToTags(tagIdToTagName);
            console.log("Done loading tags.");
            resolve(bookToTags);
        });
    });
}

async function loadBooksToTags(tagIdToTagName) {
    return new Promise((resolve, reject) => {
        const bookToTagIdStream = request.get("https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/book_tags.csv");
        const parsedBookToTagIdStream = papa.parse(papa.NODE_STREAM_INPUT, parseOptions);
        bookToTagIdStream.pipe(parsedBookToTagIdStream);
    
        parsedBookToTagIdStream.on("data", row => {
            const bookId = row.goodreads_book_id;
            // Stop reading after we reach the NUM_BOOKSth book
            if (bookId > config.NUM_BOOKS) bookToTagIdStream.destroy();

            const tagId = row.tag_id;
            const tagName = tagIdToTagName[tagId];
    
            if (!bookToTags[bookId]) bookToTags[bookId] = [];
    
            bookToTags[bookId].push(tagName);
        });

        parsedBookToTagIdStream.on("finish", () => resolve());
    });
};

module.exports = loadTagMap;