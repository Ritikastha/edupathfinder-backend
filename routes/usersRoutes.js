const router =require('express').Router();
const userController =require('../controllers/userControllers')
// create user api
router.post('/create',userController.createUser)
router.post('/login',userController.loginUser)
router.get('/get',userController.getUser)
module.exports=router;