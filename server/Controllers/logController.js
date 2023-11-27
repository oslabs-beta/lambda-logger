const AWS = require("aws-sdk");
require("dotenv").config();

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
      const groupNames = data.logGroups.map(group => {
        return group.logGroupName;
      });
      const filteredGroupNames = data.logGroups
        .filter(
          group =>
            group.logGroupName && group.logGroupName.startsWith('/aws/lambda'),
        )
        .map(group => group.logGroupName);
      console.log('Log Groups', filteredGroupNames);
      res.locals.loggroups = filteredGroupNames;
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
      console.log('streams data:', data);
      const streams = data.logStreams;
      const streamnames = streams.map(stream => {
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

  // Define parameters for filterLogEvents
  const params = {
    logGroupName: decodeURIComponent(req.headers['log-group']),
    logStreamNames: [decodeURIComponent(req.headers['log-stream'])],
    // Optionally, specify a filter pattern and time range
    // filterPattern: '', // Define a filter pattern if needed
    // startTime: START_TIME, // StartTime in milliseconds
    // endTime: END_TIME, // EndTime in milliseconds
  };

  cloudWatchLogs.filterLogEvents(params, function (err, data) {
    if (err) {
      return next(err);
    } else {
      try {
        console.log('Inside fetching log stream data');
        const messages = data.events.map(event => {
          console.log('Inside fetching filtered log data:', data);
          const messageString = event.message;
          const jsonRegex = /\{[\s\S]*\}/;
          const match = messageString.match(jsonRegex);
          let messageObj = null;

          if (match) {
            try {
              messageObj = JSON.parse(match[0]);
            } catch (parseErr) {
              console.error('Error parsing JSON', parseErr);
            }
          }

          const parsedLogEntry = parseLogEntry(messageString, match);

          // Combine the parsed log entry with the JSON object, if present
          if (messageObj !== null && parsedLogEntry.message) {
            parsedLogEntry[parsedLogEntry.message] = messageObj;
          }
          return parsedLogEntry;
        });

        res.locals.logs = messages;
        return next();
      } catch (e) {
        return next(e);
      }
    }
  });

  // Helper function to parse various log entry formats
  function parseLogEntry(logString, jsonMatch) {
    logString = logString.trim();

    if (logString.startsWith('2023')) {
      // Standard Log Format
      const parts = logString
        .replace(jsonMatch && jsonMatch[0], '')
        .split('\t')
        .map(part => part.trim());
      return {
        timestamp: parts[0],
        id: parts[1],
        level: parts[2],
        message: parts[3],
      };
    } else if (
      logString.startsWith('START') ||
      logString.startsWith('INIT_START')
    ) {
      // START, INIT_START Formats
      return parseKeyValuePairs(logString);
    } else if (logString.startsWith('REPORT') || logString.startsWith('END')) {
      // REPORT, END Formats
      return parseKeyValuePairs(logString);
    } else {
      // Other Formats or Unrecognized Format
      return { raw: logString };
    }
  }

  function parseKeyValuePairs(logString) {
    const obj = {};
    const parts = logString.split('\t');
    parts.forEach(part => {
      const [key, value] = part.split(':').map(s => s.trim());
      if (key && value) {
        obj[key] = value;
      }
    });
    return obj;
  }
};

module.exports = logController;
