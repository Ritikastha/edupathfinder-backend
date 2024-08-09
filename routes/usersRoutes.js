const router =require('express').Router();
const userController =require('../controllers/userControllers')
// create user api
router.post('/create',userController.createUser)
router.post('/login',userController.loginUser)
router.get('/get',userController.getUser)
router.post('/updatePassword', userController.updatePassword);
module.exports=router;