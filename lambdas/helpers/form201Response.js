const form201Response = data => {
    const response = {
        statusCode: 201
    };

    if (data) {
        response.headers = {"Content-Type": "application/json"};
        response.body = JSON.stringify(data);
    }

    return response;
};

module.exports = form201Response;