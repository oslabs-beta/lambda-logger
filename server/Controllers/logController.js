const AWS = require("aws-sdk");
require("dotenv").config();
// Configure AWS with your credentials and region
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});

// Create a CloudWatchLogs client
const cloudWatchLogs = new AWS.CloudWatchLogs();
const logController = {};

/********************* FETCH LOG GROUPS ***********************************************/

logController.fetchLogGroups = (req, res, next) => {
  const params = {
    limit: "50",
  };

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

/********************* FETCH LOGS ***********************************************/

logController.fetchLogs = (req, res, next) => {
  const paramsDescribe = {
    logGroupName: "/aws/lambda/helloWorldTest",
  };
  console.log("request query", req.query);
  console.log("AccessKey state", req.query.accessKey);
  console.log("Secret Key state", req.query.secretKey);
  console.log("Region state", req.query.region);
  /* UNCOMMENT THIS CONFIG OBJ ONCE WE HAVE ACCESS KEY, SECRET KEY, AND REGION STATE WIRED UP */
  // AWS.config.update({
  //   accessKeyId: process.env.ACCESS_KEY,
  //   secretAccessKey: process.env.SECRET_KEY,
  //   region: process.env.REGION,
  // });
  cloudWatchLogs.describeLogStreams(paramsDescribe, function (err, data) {
    if (err) {
      return next(err); // Pass the error to the Express error handler
    } else {
      if (!data.logStreams || data.logStreams.length === 0) {
        return next(new Error("No log streams found")); // Handle the case where there are no log streams
      }
      const stream = data.logStreams[0];
      const paramsGet = {
        logGroupName: paramsDescribe.logGroupName,
        logStreamName: stream.logStreamName,
      };

      cloudWatchLogs.getLogEvents(paramsGet, function (err, data) {
        if (err) {
          return next(err); // Pass the error to the Express error handler
        } else {
          try {
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
    }
  });
};

module.exports = logController;
