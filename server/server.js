require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();
const logRoutes = require('./routes/logRoutes');

// Middleware
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/credentials', logRoutes);

// 404 route
app.all('*', (req, res) => {
  res.status(404).send('The page you are looking for does not exist');
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = server;
