const form404Response = errorMessage => {
    const response = {
        statusCode: 404
    };

    if (data) {
        response.body = errorMessage;
    }

    return response;
};

module.exports = form404Response;