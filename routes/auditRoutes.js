const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/auditControllers');
const { authGuardAdmin } = require('../middleware/authGuard');

// Define the route for fetching logs, protected by authGuardAdmin
router.get('/logs', authGuardAdmin, getLogs);

module.exports = router;
