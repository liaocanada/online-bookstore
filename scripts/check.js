const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({region: 'us-east-1'});

const params = {};

lambda.listFunctions(params, function(err, data) {
    data.Functions
        .map(func => func.FunctionArn)
        .forEach(arn => {
            lambda.getFunction({FunctionName: arn}, (err, data) => {
                const layers = data.Configuration.Layers;
                if (layers) layers.forEach(layer => {
                    console.log(layer.Arn);
                    if (layer.Arn !== "arn:aws:lambda:us-east-1:095371326078:layer:bookstore-layer-aurora:3") {
                        console.log(data.Configuration.FunctionName);
                    }
                });
            });
        });
});
