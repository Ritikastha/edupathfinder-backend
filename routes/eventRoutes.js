const router = require('express').Router();
const eventControllers = require('../controllers/eventControllers');

// Create feature API
router.post('/create_event', eventControllers.createEvent);

// Get all features API
router.get('/get_event', eventControllers.getAllEvent);

// Delete feature API
router.delete('/delete_event/:id', eventControllers.deletedEvent);

module.exports = router;