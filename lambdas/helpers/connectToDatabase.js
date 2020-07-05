const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const createClient = require('data-api-client');

// require('dotenv').config();
// const rdsDataService = new AWS.RDSDataService();

const getDatabaseName = async () => {
    const ssm = new AWS.SSM({region: 'us-east-1'});
    const dbParamKey = '/bookstore/db/name';

    const data = await new Promise((resolve, reject) => {
        ssm.getParameter({ Name: dbParamKey }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })

    return data.Parameter.Value;
};

const connect = async () => {
    // Require and instantiate data-api-client with secret and cluster arns
    const client = createClient({
        secretArn: 'arn:aws:secretsmanager:us-east-1:095371326078:secret:rds-db-credentials/cluster-HFPRLGMVCYC37ZDV7N2NOGAIUA/postgres-6ixLQg',
        resourceArn: 'arn:aws:rds:us-east-1:095371326078:cluster:auroraserverless-bookstore-db',
        database: await getDatabaseName()
    });

    return client;
};

module.exports = connect;
