const AWS = require("aws-sdk");
const log = require("lambda-log");

// Configure AWS with your credentials and region
AWS.config.update({
  accessKeyId: "AKIAYTC76N32CK4B3VG2",
  secretAccessKey: "keK8SZlWI1kvoj4/T7+Cg9t1aD5/+TNXjyYfwjjV",
  region: "us-east-1",
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
  log.info("Hello from LambdaLog!");
  // Parameters for the describeLogStreams method
  const paramsDescribe = {
    // Use only the name of the log group, not the full ARN
    logGroupName: "/aws/lambda/newTest", // The log group name
    // You can add additional parameters as needed
  };

  // Retrieve log streams
  cloudWatchLogs.describeLogStreams(paramsDescribe, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      //   console.log(data); // successful response
      // Assuming you want to get logs from the first stream
      console.log("Log group names:", data);
      const stream = data.logStreams[0];
      console.log("stream object:", stream);
      if (stream) {
        // Parameters for the getLogEvents method
        const paramsGet = {
          logGroupName: paramsDescribe.logGroupName,
          logStreamName: stream.logStreamName,
          // You can add additional parameters as needed
        };

        // Retrieve log events
        cloudWatchLogs.getLogEvents(paramsGet, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            console.log("data object:", data);
            const messages = data.events.map((evnt) => {
              const messageString = evnt.message;
              const parts = messageString.split("\t");
              //   console.log("parts", parts);
              const jsonPart = parts.pop();
              console.log("Opening char:", jsonPart[0]);
              if (jsonPart[0] === "{") {
                console.log("happy");
                // console.log("jsonPart Obj:", jsonPart);
                const messageObj = JSON.parse(jsonPart);
                console.log("json Part:", jsonPart);
                console.log("message obj:", messageObj);
                // const formatted = JSON.stringify(messageObj, null, 4);
                return { Events: parts, LogEvent: messageObj };
              } else {
                return { Events: parts, LogEvent: jsonPart };
              }
            });
            // console.log("messages:", messages);
            res.locals.logs = [messages, data];
            return next();
          } // successful response
        });
      }
    }
  });
};

module.exports = logController;
