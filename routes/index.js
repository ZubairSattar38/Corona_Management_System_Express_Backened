var express = require('express');
const authController = require('../controllers/authentication');
const doctController = require('../controllers/doctor');
var router = express.Router();


router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/addDoctor',doctController.addDoctor);
module.exports = router;
