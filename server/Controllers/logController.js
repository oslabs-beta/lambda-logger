const AWS = require("aws-sdk");
require("dotenv").config();
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
    limit: "50",
  };
  // Access the headers instead of query parameters
  const accessKey = req.headers["access-key"];
  const secretKey = req.headers["secret-key"];
  const region = req.headers["aws-region"];

  // Check if all necessary credentials are provided
  if (!accessKey || !secretKey || !region) {
    return next(new Error("Missing AWS credentials in headers"));
  }

  // Update the AWS config with the credentials from the headers
  AWS.config.update({
    accessKeyId: decodeURIComponent(accessKey),
    secretAccessKey: decodeURIComponent(secretKey),
    region: decodeURIComponent(region),
  });
  const cloudWatchLogs = new AWS.CloudWatchLogs();
  cloudWatchLogs.describeLogGroups(params, function (err, data) {
    console.log("inside Describe Log Groups");
    if (err) {
      console.log("Error", err);
      return next(err);
    } else {
      const groupNames = data.logGroups.map((group) => {
        return group.logGroupName;
      });
      console.log("Log Groups", groupNames);
      res.locals.loggroups = groupNames;
      return next();
    }
  });
};

/********************* FETCH LOG STREAMS ***********************************************/

logController.fetchLogStreams = (req, res, next) => {
  console.log("inside fetch streams,");
  const paramsDescribe = {
    logGroupName: decodeURIComponent(req.headers["log-group"]),
  };

  // Access the headers instead of query parameters
  const accessKey = req.headers["access-key"];
  const secretKey = req.headers["secret-key"];
  const region = req.headers["aws-region"];

  // Check if all necessary credentials are provided
  if (!accessKey || !secretKey || !region) {
    return next(new Error("Missing AWS credentials in headers"));
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
        return next(new Error("No log streams found")); // Handle the case where there are no log streams
      }
      console.log("streams data:", data);
      const streams = data.logStreams;
      const streamnames = streams.map((stream) => {
        return stream.logStreamName;
      });
      console.log("streams pulled from API:", streamnames);
      res.locals.streams = streamnames;
      return next();
    }
  });
};
/********************* FETCH LOGS ***********************************************/

logController.fetchLogs = (req, res, next) => {
  // const logGroupName = decodeURIComponent(req.headers["log-group"]);
  // const logStreamName = decodeURIComponent(req.headers["log-stream"]);

  // Access the headers instead of query parameters
  const accessKey = req.headers["access-key"];
  const secretKey = req.headers["secret-key"];
  const region = req.headers["aws-region"];

  // Check if all necessary credentials are provided
  if (!accessKey || !secretKey || !region) {
    return next(new Error("Missing AWS credentials in headers"));
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
    logGroupName: decodeURIComponent(req.headers["log-group"]),
    logStreamNames: [decodeURIComponent(req.headers["log-stream"])],
    // Optionally, specify a filter pattern and time range
    // filterPattern: '', // Define a filter pattern if needed
    // startTime: START_TIME, // StartTime in milliseconds
    // endTime: END_TIME, // EndTime in milliseconds
  };

  // Use filterLogEvents instead of getLogEvents
  cloudWatchLogs.filterLogEvents(params, function (err, data) {
    if (err) {
      return next(err); // Pass the error to the Express error handler
    } else {
      try {
        console.log("Inside fetching filtered log data");
        const messages = data.events.map((event) => {
          const messageString = event.message;
          const jsonRegex = /\{[\s\S]*\}/;
          const match = messageString.match(jsonRegex);
          let messageObj = null;

          if (match) {
            try {
              messageObj = JSON.parse(match[0]);
            } catch (parseErr) {
              console.error("Error parsing JSON", parseErr);
              // Decide how to handle the parse error
            }
          }

          const parts = messageString
            .replace(match && match[0], "")
            .trim()
            .split("\t");
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

// logController.fetchLogs = (req, res, next) => {
//   // ... Existing setup code ...
//   const paramsDescribe = {
//     logGroupName: decodeURIComponent(req.headers["log-group"]),
//     logStreamName: decodeURIComponent(req.headers["log-stream"]),
//   };
//   console.log(decodeURIComponent(req.headers["log-stream"]));
//   // Access the headers instead of query parameters
//   const accessKey = req.headers["access-key"];
//   const secretKey = req.headers["secret-key"];
//   const region = req.headers["aws-region"];

//   // Check if all necessary credentials are provided
//   if (!accessKey || !secretKey || !region) {
//     return next(new Error("Missing AWS credentials in headers"));
//   }

//   // Update the AWS config with the credentials from the headers
//   AWS.config.update({
//     accessKeyId: decodeURIComponent(accessKey),
//     secretAccessKey: decodeURIComponent(secretKey),
//     region: decodeURIComponent(region),
//   });
//   const cloudWatchLogs = new AWS.CloudWatchLogs();

//   // Function to recursively fetch log events
//   function fetchLogEvents(params, accumulatedData = []) {
//     cloudWatchLogs.getLogEvents(params, function (err, data) {
//       if (err) {
//         return next(err); // Handle error
//       }

//       // Process and accumulate data
//       const processedData = processLogEventsData(data);
//       console.log("unprocessed data:", data); // You'll define this function
//       accumulatedData = accumulatedData.concat(processedData);

//       // Check for and handle pagination
//       if (data.nextForwardToken && data.events.length) {
//         // Update params with the next token and fetch next page
//         const newParams = { ...params, nextToken: data.nextForwardToken };
//         fetchLogEvents(newParams, accumulatedData);
//       } else {
//         console.log("accumulatedData:", accumulatedData);
//         // Once all data is fetched, pass it forward
//         res.locals.logs = accumulatedData;
//         return next();
//       }
//     });
//   }

//   // Define a function to process log event data
//   function processLogEventsData(data) {
//     return data.events.map((event) => {
//       const messageString = event.message;
//       const jsonRegex = /\{[\s\S]*\}/;
//       const match = messageString.match(jsonRegex);
//       let messageObj = null;

//       if (match) {
//         try {
//           messageObj = JSON.parse(match[0]);
//         } catch (parseErr) {
//           console.error("Error parsing JSON", parseErr);
//         }
//       }

//       const parts = messageString
//         .replace(match && match[0], "")
//         .trim()
//         .split("\t");
//       return { Events: parts, LogEvent: messageObj };
//     });
//   }

//   const paramsGet = {
//     logGroupName: paramsDescribe.logGroupName,
//     logStreamName: paramsDescribe.logStreamName,
//   };

//   fetchLogEvents(paramsGet);
// };
// ********************************************************
// logController.fetchLogs = (req, res, next) => {
//   const paramsDescribe = {
//     logGroupName: decodeURIComponent(req.headers['log-group']),
//     logStreamName: decodeURIComponent(req.headers['log-stream']),
//   };
//   console.log(decodeURIComponent(req.headers['log-stream']));
//   // Access the headers instead of query parameters
//   const accessKey = req.headers['access-key'];
//   const secretKey = req.headers['secret-key'];
//   const region = req.headers['aws-region'];

//   // Check if all necessary credentials are provided
//   if (!accessKey || !secretKey || !region) {
//     return next(new Error('Missing AWS credentials in headers'));
//   }

//   // Update the AWS config with the credentials from the headers
//   AWS.config.update({
//     accessKeyId: decodeURIComponent(accessKey),
//     secretAccessKey: decodeURIComponent(secretKey),
//     region: decodeURIComponent(region),
//   });
//   const cloudWatchLogs = new AWS.CloudWatchLogs();

//   const paramsGet = {
//     logGroupName: paramsDescribe.logGroupName,
//     logStreamName: paramsDescribe.logStreamName,
//   };

//   cloudWatchLogs.getLogEvents(paramsGet, function (err, data) {
//     if (err) {
//       return next(err); // Pass the error to the Express error handler
//     } else {
//       try {
//         console.log('Inside fetching log stream data');
//         const messages = data.events.map((event) => {
//           const messageString = event.message;
//           const jsonRegex = /\{[\s\S]*\}/;
//           const match = messageString.match(jsonRegex);
//           let messageObj = null;

//           if (match) {
//             try {
//               messageObj = JSON.parse(match[0]);
//             } catch (parseErr) {
//               console.error('Error parsing JSON', parseErr);
//               // Decide how to handle the parse error
//             }
//           }

//           const parts = messageString
//             .replace(match && match[0], '')
//             .trim()
//             .split('\t');
//           return { Events: parts, LogEvent: messageObj };
//         });

//         res.locals.logs = messages;
//         return next();
//       } catch (e) {
//         return next(e); // Catch and pass any other errors that occur during processing
//       }
//     }
//   });
// };

module.exports = logController;
