var AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: process.env.region
    
})

var db = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });

module.exports = db;
