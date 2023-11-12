const AWS = require('aws-sdk');
require('dotenv').config();
// Configure AWS with your credentials and region
// AWS.config.update({
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_KEY,
//   region: process.env.REGION,
// });

// Create a CloudWatchLogs client

const logController = {};

/********************* FETCH LOG GROUPS ***********************************************/

logController.fetchLogGroups = (req, res, next) => {
  const params = {
    limit: '50',
  };
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
  const cloudWatchLogs = new AWS.CloudWatchLogs();
  cloudWatchLogs.describeLogGroups(params, function (err, data) {
    console.log('inside Describe Log Groups');
    if (err) {
      console.log('Error', err);
      return next(err);
    } else {
      const groupNames = data.logGroups.map((group) => {
        return group.logGroupName;
      });
      console.log('Log Groups', groupNames);
      res.locals.loggroups = groupNames;
      return next();
    }
  });
};

/********************* FETCH LOG STREAMS ***********************************************/

logController.fetchLogStreams = (req, res, next) => {
  console.log('inside fetch streams,');
  const paramsDescribe = {
    logGroupName: decodeURIComponent(req.headers['log-group']),
  };

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
  const cloudWatchLogs = new AWS.CloudWatchLogs();
  cloudWatchLogs.describeLogStreams(paramsDescribe, function (err, data) {
    if (err) {
      return next(err); // Pass the error to the Express error handler
    } else {
      if (!data.logStreams || data.logStreams.length === 0) {
        return next(new Error('No log streams found')); // Handle the case where there are no log streams
      }
      const streams = data.logStreams;
      const streamnames = streams.map((stream) => {
        return stream.logStreamName;
      });
      console.log('streams pulled from API:', streamnames);
      res.locals.streams = streamnames;
      return next();
    }
  });
};
/********************* FETCH LOGS ***********************************************/

logController.fetchLogs = (req, res, next) => {
  const paramsDescribe = {
    logGroupName: decodeURIComponent(req.headers['log-group']),
    logStreamName: decodeURIComponent(req.headers['log-stream']),
  };
  console.log(decodeURIComponent(req.headers['log-stream']));
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
  const cloudWatchLogs = new AWS.CloudWatchLogs();
  // cloudWatchLogs.describeLogStreams(paramsDescribe, function (err, data) {
  //   if (err) {
  //     return next(err); // Pass the error to the Express error handler
  //   } else {
  //     if (!data.logStreams || data.logStreams.length === 0) {
  //       return next(new Error("No log streams found")); // Handle the case where there are no log streams
  //     }
  //     console.log("inside fetching logs");

  const paramsGet = {
    logGroupName: paramsDescribe.logGroupName,
    logStreamName: paramsDescribe.logStreamName,
  };

  cloudWatchLogs.getLogEvents(paramsGet, function (err, data) {
    if (err) {
      return next(err); // Pass the error to the Express error handler
    } else {
      try {
        console.log('Inside fetching log stream data');
        const messages = data.events.map((event) => {
          const messageString = event.message;
          const jsonRegex = /\{[\s\S]*\}/;
          const match = messageString.match(jsonRegex);
          let messageObj = null;

          if (match) {
            try {
              messageObj = JSON.parse(match[0]);
            } catch (parseErr) {
              console.error('Error parsing JSON', parseErr);
              // Decide how to handle the parse error
            }
          }

          const parts = messageString
            .replace(match && match[0], '')
            .trim()
            .split('\t');
          return { Events: parts, LogEvent: messageObj };
        });

        res.locals.logs = messages;
        return next();
      } catch (e) {
        return next(e); // Catch and pass any other errors that occur during processing
      }
    }
  });
};

module.exports = logController;
