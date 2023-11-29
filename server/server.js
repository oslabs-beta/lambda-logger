const PORT = 3000;
const express = require("express");
const logController = require("./Controllers/logController");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/build", express.static(path.resolve(__dirname, "../build")));

app.use(express.static(path.resolve(__dirname, "../client")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../client/src/index.html"));
});
/* ******************************************** GET REQUEST ROUTES ***************************************** */

app.get("/logs", logController.fetchLogs, (req, res) => {
  return res.status(200).json(res.locals.logs);
});

app.get("/loggroups", logController.fetchLogGroups, (req, res) => {
  return res.status(200).json(res.locals.loggroups);
});

app.get("/logstreams", logController.fetchLogStreams, (req, res) => {
  return res.status(200).json(res.locals.streams);
});

// 404 route
app.all("*", (req, res) => {
  res.status(404).send("The page you are looking for does not exist");
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express middleware error",
    status: 500,
    message: { err: "An error occured" },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

const server = app.listen(PORT);

module.exports = server;
