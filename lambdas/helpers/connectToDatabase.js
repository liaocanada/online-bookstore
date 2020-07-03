const AWS = require('aws-sdk');
const { Client } = require('pg');

require('dotenv').config();
const ssm = new AWS.SSM({region: 'us-east-1'});

const connect = async () => {
    const awsSsmParams = [
        '/bookstore/db/username',
        '/bookstore/db/password',
        '/bookstore/db/url',
        '/bookstore/db/port',
        '/bookstore/db/name'
    ];
    const params = {
        Names: awsSsmParams,
        WithDecryption: true
    };
    const { Parameters } = await new Promise((resolve, reject) => {
        ssm.getParameters(params, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })

    const getParameterValue = index => 
        Parameters.find(param => param.Name === awsSsmParams[index]).Value;

    const client = new Client({ 
        user: getParameterValue(0),
        password: getParameterValue(1),
        host: getParameterValue(2),
        port: parseInt(getParameterValue(3)),
        database: getParameterValue(4)
    });
    
    await client.connect();

    return client;
};

module.exports = connect;