const router =require('express').Router();
const rateandreviewControllers = require('../controllers/rateandreviewControllers');
// const { authGuard} = require('../middleware/authGuard');


// create booking api
router.post('/create_review',rateandreviewControllers.createReview)

// get all booking api
router.get('/get_review/:schoolId',rateandreviewControllers.getAllReview)

// get single booking api
// router.get('/get_package/:id',packageControllers.getSinglePackage)

// delete booking api
// router.delete('/delete_school/:id',rateandreviewControllers.deletedReview)

module.exports=router;