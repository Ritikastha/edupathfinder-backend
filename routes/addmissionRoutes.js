const router = require('express').Router();
const addmissionControllers = require('../controllers/addmissionControllers');

// Create feature API
router.post('/create_addmission', addmissionControllers.createAddmission);

// Get all features API
router.get('/get_addmission', addmissionControllers.getAllAddmission);

module.exports = router;