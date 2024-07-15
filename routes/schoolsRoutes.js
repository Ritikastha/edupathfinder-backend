const router =require('express').Router();
const schoolsControllers = require('../controllers/schoolsControllers');
// const { authGuard} = require('../middleware/authGuard');


// create booking api
router.post('/create_school',schoolsControllers.createSchool)

// get all booking api
router.get('/get_school',schoolsControllers.getAllSchool)

// get single booking api
// router.get('/get_package/:id',packageControllers.getSinglePackage)

// delete booking api
router.delete('/delete_school/:id',schoolsControllers.deletedSchool)

module.exports=router;