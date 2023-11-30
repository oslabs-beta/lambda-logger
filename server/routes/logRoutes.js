const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const awsConfig = require('../middleware/awsConfig');

router.use(awsConfig);
router.get('/logs', logController.fetchLogs, (req, res) => {
  return res.status(200).json(res.locals.logs);
});
router.get('/loggroups', logController.fetchLogGroups, (req, res) => {
  return res.status(200).json(res.locals.loggroups);
});
router.get('/logstreams', logController.fetchLogStreams, (req, res) => {
  return res.status(200).json(res.locals.streams);
});

module.exports = router;
