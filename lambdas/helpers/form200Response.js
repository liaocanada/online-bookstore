const form200Response = data => {
    const response = {
        statusCode: 200
    };

    if (data) {
        response.headers = {"Content-Type": "application/json"};
        response.body = JSON.stringify(data);
    }

    return response;
};

module.exports = form200Response;