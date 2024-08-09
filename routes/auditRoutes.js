const express = require('express');
const router = express.Router();

// Controller function to handle the logs
const { getLogs } = require('../controllers/auditControllers');

// Define the route for fetching logs
router.get('/logs', getLogs);

module.exports = router;
