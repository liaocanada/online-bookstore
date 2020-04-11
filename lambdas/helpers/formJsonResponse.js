const formJsonResponse = (statusCode, data) => {
    if (statusCode < 100 || statusCode >= 600) throw new Error("Invalid HTTP status code.");

    const response = {
        statusCode
    };

    if (data) {
        response.headers = {"Content-Type": "application/json"};
        response.body = JSON.stringify(data);
    }

    return response;
};

module.exports = formJsonResponse;