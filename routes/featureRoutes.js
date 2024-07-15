const router = require('express').Router();
const featureControllers = require('../controllers/featureControllers');

// Create feature API
router.post('/create_feature', featureControllers.createFeature);

// Get all features API
router.get('/get_feature', featureControllers.getAllFeature);

// Delete feature API
router.delete('/delete_feature/:id', featureControllers.deletedFeature);

module.exports = router;
