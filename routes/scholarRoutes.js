const router = require('express').Router();
const scholarControllers = require('../controllers/scholarshipControllers');

// Create Scholar API
router.post('/create_scholar', scholarControllers.createScholar);

// Get all Scholar API
router.get('/get_scholar', scholarControllers.getAllScholar);

// Delete Scholar API
router.delete('/delete_scholar/:id', scholarControllers.deletedScholar);

module.exports = router;