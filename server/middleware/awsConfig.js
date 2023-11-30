const AWS = require('aws-sdk');
require('dotenv').config();

// Create a function to configure AWS and return the configured AWS object
const configureAWS = (req, res, next) => {
  // Access the headers instead of query parameters
  const accessKey = req.headers['access-key'];
  const secretKey = req.headers['secret-key'];
  const region = req.headers['aws-region'];
 
  // Check if all necessary credentials are provided
  if (!accessKey || !secretKey || !region) {
    return next(new Error('Missing AWS credentials in headers'));
  }

  // Update the AWS config with the credentials from the headers
  AWS.config.update({
    accessKeyId: decodeURIComponent(accessKey),
    secretAccessKey: decodeURIComponent(secretKey),
    region: decodeURIComponent(region),
  });
  // Pass AWS config to the next middleware or route handler
  res.locals.AWS = AWS;
  next();
};

module.exports = configureAWS;
