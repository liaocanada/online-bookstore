const formTextResponse = (statusCode, data) => {
    if (statusCode < 100 || statusCode >= 600) throw new Error("Invalid HTTP status code.");

    const response = {
        statusCode
    };

    if (data) {
        response.headers = {"Content-Type": "text/plain"};
        response.body = data;
    }

    return response;
};

module.exports = formTextResponse;