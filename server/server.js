const PORT = 3000;
const express = require("express");
const logController = require("./Controllers/logController");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/build", express.static(path.resolve(__dirname, "../build")));

app.use(express.static(path.resolve(__dirname, "../client")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../client/src/index.html"));
});

app.get("/logs", logController.fetchLogs, (req, res) => {
  console.log("made it through middleware");
  return res.status(200).json(res.locals.logs);
});

app.get("/loggroups", logController.fetchLogGroups, (req, res) => {
  console.log("made it through middleware");
  return res.status(200).json(res.locals.loggroups);
});

// 404 route
app.all("*", (req, res) => {
  res.status(404).send("The page you are looking for does not exist");
});

//global error handler
app.use((err, req, res, next) => {
  //define default error object
  const defaultErr = {
    log: "Express middleware error", //server sees this message
    status: 500,
    message: { err: "An error occured" }, //client sees this message
  };
  //assign default error object to an errorObj variable
  const errorObj = Object.assign(defaultErr, err);
  //return json response including error object status and error object message
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log("The server is listening on port 3000"));
