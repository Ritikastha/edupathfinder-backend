const router = require('express').Router();
const basicinfoControllers = require('../controllers/basicinfoControllers');
const { authGuard } = require('../middleware/authGuard');

router.post('/create_basicinfo', basicinfoControllers.createBasicinfo);

router.get('/get_basicinfo', authGuard, basicinfoControllers.getAllBasicinfo);

router.get('/get_basicinfo/:id', authGuard, basicinfoControllers.getSingleBasicinfo);

router.put('/update_basicinfo/:id',  basicinfoControllers.updateBasicinfo);

module.exports = router;
